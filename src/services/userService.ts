interface User { id: string; name: string; email: string; }

const mockUsers: User[] = [
  { id: '1', name: 'Alice', email: 'alice@example.com' },
  { id: '2', name: 'Bob', email: 'bob@example.com' },
  { id: '3', name: 'Charlie', email: '' },
];

export const findAll = async (): Promise<User[]> => {
  return mockUsers;
};

export const findById = async (id: string): Promise<User | undefined> => {
  return mockUsers.find(u => u.id === id);
};
