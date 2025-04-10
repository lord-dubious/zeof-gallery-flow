
// This file provides a mock Supabase client for compatibility purposes
// No actual Supabase operations are performed

const createMockClient = () => {
  console.warn("Supabase is disabled. Using mock client instead.");
  
  return {
    from: (table: string) => ({
      select: (columns?: string) => ({
        eq: () => ({ data: [], error: null }),
        order: () => ({ data: [], error: null }),
        limit: () => ({ data: [], error: null }),
        single: () => ({ data: null, error: null })
      }),
      insert: (data: any) => ({ data: null, error: null }),
      update: (data: any) => ({ data: null, error: null }),
      delete: () => ({ data: null, error: null })
    }),
    storage: {
      from: (bucket: string) => ({
        upload: () => ({ data: null, error: null }),
        getPublicUrl: (path: string) => ({ data: { publicUrl: "" }, error: null }),
        remove: () => ({ data: null, error: null })
      })
    },
    auth: {
      getUser: () => ({ data: { user: null }, error: null }),
      signOut: () => ({ error: null })
    },
    supabaseUrl: "",
    supabaseKey: "",
    realtime: { channel: () => ({ subscribe: () => ({}) }) },
    realtimeUrl: "",
    setAuth: () => {},
    getChannels: () => [],
    removeChannel: () => {},
    removeAllChannels: () => {},
    getSubscriptions: () => ({}),
    _closeChannel: () => {},
    _isClientInitialized: true
  } as any;
};

export const supabase = createMockClient();
