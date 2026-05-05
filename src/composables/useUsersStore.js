import { computed, ref, watch } from 'vue';
import { users as seedUsers } from '../data/users.js';

const STORAGE_KEY = 'user-dashboard-users';

const cloneUsers = (list) => list.map((user) => ({ ...user }));

const getInitialUsers = () => {
    if (typeof window === 'undefined') {
        return cloneUsers(seedUsers);
    }

    try {
        const storedUsers = window.localStorage.getItem(STORAGE_KEY);
        return storedUsers ? JSON.parse(storedUsers) : cloneUsers(seedUsers);
    } catch {
        return cloneUsers(seedUsers);
    }
};

const getInitials = (name = '') =>
    name
        .split(/\s+/)
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0])
        .join('')
        .toUpperCase() || 'US';

const normalizeUser = (user) => ({
    id: user.id ?? Date.now(),
    name: user.name.trim(),
    email: user.email.trim(),
    role: user.role,
    status: user.status,
    joined: user.joined,
    avatar: user.avatar?.trim() || getInitials(user.name),
    revenue: Number(user.revenue) || 0,
    country: user.country.trim() || '🌎',
});

export const createBlankUser = () => ({
    id: null,
    name: '',
    email: '',
    role: 'Viewer',
    status: 'Pendiente',
    joined: new Date().toISOString().slice(0, 10),
    avatar: '',
    revenue: 0,
    country: '🌎',
});

export function useUsersStore() {
    const users = ref(getInitialUsers());

    watch(
        users,
        (value) => {
            if (typeof window === 'undefined') {
                return;
            }

            window.localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
        },
        { deep: true },
    );

    const stats = computed(() => {
        const totalUsers = users.value.length;
        const activeUsers = users.value.filter(
            (user) => user.status === 'Activo',
        ).length;
        const revenue = users.value.reduce(
            (sum, user) => sum + Number(user.revenue || 0),
            0,
        );
        const growth = totalUsers
            ? ((activeUsers / totalUsers) * 100).toFixed(1)
            : '0.0';

        return {
            totalUsers,
            activeUsers,
            revenue,
            growth,
        };
    });

    const saveUser = (payload, mode = 'edit') => {
        const normalizedUser = normalizeUser(payload);

        if (mode === 'create') {
            const nextId = Math.max(0, ...users.value.map((user) => user.id)) + 1;
            users.value = [{ ...normalizedUser, id: nextId }, ...users.value];
            return;
        }

        users.value = users.value.map((user) =>
            user.id === normalizedUser.id ? normalizedUser : user,
        );
    };

    const deleteUserById = (userId) => {
        users.value = users.value.filter((user) => user.id !== userId);
    };

    return {
        users,
        stats,
        createBlankUser,
        saveUser,
        deleteUserById,
    };
}