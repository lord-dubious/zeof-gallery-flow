
// This is a static site with no actual Supabase integration
// This file exists to avoid import errors in other files that may still reference it

export const supabase = {
  auth: {
    onAuthStateChange: () => ({ data: null, error: null }),
    signOut: async () => ({ error: null }),
    getUser: async () => ({ data: { user: null }, error: null }),
  },
  from: () => ({
    select: () => ({
      eq: () => ({
        order: () => ({
          data: [],
          error: null
        })
      })
    })
  })
};
