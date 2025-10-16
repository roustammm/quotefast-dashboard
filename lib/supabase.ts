/* Complete Supabase setup voor QuoteFast */

import { createClient } from '@supabase/supabase-js'

// Environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false
  }
})

// Admin client for server-side operations
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
    detectSessionInUrl: false
  }
})

// User management utilities
export const authUtils = {
  // Get current user
  getUser: async () => {
    const { data: { session } } = await supabase.auth.getSession()
    return session?.user
  },

  // Sign up user
  signUp: async (email: string, password: string, options?: any) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          ...options,
          email_confirm: true
        }
      }
    })
    return { data, error }
  },

  // Sign in user
  signIn: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    return { data, error }
  },

  // OAuth sign in
  signInWithOAuth: async (provider: 'google' | 'github' | 'linkedin') => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`
      }
    })
    return { data, error }
  },

  // Send magic link
  signInWithOtp: async (email: string) => {
    const { data, error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`
      }
    })
    return { data, error }
  },

  // Sign out
  signOut: async () => {
    const { error } = await supabase.auth.signOut()
    return { error }
  },

  // Update user profile
  updateProfile: async (updates: any) => {
    const { data, error } = await supabase.auth.updateUser({
      data: updates
    })
    return { data, error }
  },

  // Reset password
  resetPassword: async (email: string) => {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/reset-password`
    })
    return { data, error }
  }
}

// Database utilities
export const dbUtils = {
  // Users table operations
  getUserById: async (userId: string) => {
    const { data, error } = await supabase
      .from('users')
      .select(`
        id,
        email,
        full_name,
        avatar_url,
        phone,
        role,
        company_name,
        industry,
        team_size,
        created_at,
        updated_at
      `)
      .eq('id', userId)
      .single()

    return { data, error }
  },

  // Update user profile
  updateUserProfile: async (userId: string, updates: any) => {
    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', userId)

    return { data, error }
  },

  // Get team members
  getTeamMembers: async (organizationId: string) => {
    const { data, error } = await supabase
      .from('team_members')
      .select(`
        id,
        user_id,
        role,
        status,
        joined_at
      `)
      .eq('organization_id', organizationId)

    return { data, error }
  },

  // Invite team member
  inviteTeamMember: async (organizationId: string, email: string, role: string) => {
    // Note: getUserByEmail is not available in current Supabase version
    // Using alternative approach - this would need to be implemented differently
    const { data: { users }, error: listUsersError } = await supabase.auth.admin.listUsers()
    const user = users?.find(u => u.email === email)

    if (!user) {
      return { error: { message: 'User not found' } }
    }

    const { data, error: insertError } = await supabase
      .from('team_members')
      .insert({
        user_id: user.id,
        organization_id: organizationId,
        role,
        status: 'invited',
        joined_at: new Date().toISOString()
      })

    return { data, error: insertError }
  }
}

// Offers table operations
export const offersUtils = {
  // Get offers for user/organization
  getOffers: async (userId: string) => {
    const { data, error } = await supabase
      .from('offers')
      .select(`
        id,
        title,
        client_name,
        amount,
        status,
        created_at,
        updated_at,
        due_date,
        organization_id
      `)
      .eq('organization_id', userId)
      .order('created_at', { ascending: false })

    return { data, error }
  },

  // Create new offer
  createOffer: async (offerData: any, userId: string) => {
    const { data, error } = await supabase
      .from('offers')
      .insert({
        ...offerData,
        organization_id: userId,
        status: 'draft',
        created_at: new Date().toISOString()
      })
      .select()
      .single()

    return { data, error }
  },

  // Update offer
  updateOffer: async (offerId: string, updates: any) => {
    const { data, error } = await supabase
      .from('offers')
      .update(updates)
      .eq('id', offerId)
      .select()
      .single()

    return { data, error }
  },

  // Delete offer
  deleteOffer: async (offerId: string) => {
    const { data, error } = await supabase
      .from('offers')
      .delete()
      .eq('id', offerId)

    return { data, error }
  }
}

// Customers table operations
export const customersUtils = {
  // Get all customers
  getCustomers: async (userId: string) => {
    const { data, error } = await supabase
      .from('customers')
      .select(`
        id,
        name,
        email,
        phone,
        company,
        address,
        status,
        created_at
      `)
      .eq('organization_id', userId)
      .order('created_at', { ascending: false })

    return { data, error }
  },

  // Create customer
  createCustomer: async (customerData: any, userId: string) => {
    const { data, error } = await supabase
      .from('customers')
      .insert({
        ...customerData,
        organization_id: userId,
        status: 'lead',
        created_at: new Date().toISOString()
      })
      .select()
      .single()

    return { data, error }
  },

  // Update customer
  updateCustomer: async (customerId: string, updates: any) => {
    const { data, error } = await supabase
      .from('customers')
      .update(updates)
      .eq('id', customerId)
      .select()
      .single()

    return { data, error }
  }
}

// File storage utilities
export const storageUtils = {
  // Upload offer PDF
  uploadOfferPDF: async (offerId: string, file: File) => {
    const fileExt = file.name.split('.').pop()
    const fileName = `${offerId}.${fileExt}`

    const { data, error } = await supabase.storage
      .from('offers')
      .upload(`public/${fileName}`, file, {
        cacheControl: '3600',
        upsert: false
      })

    if (data) {
      // Update offer with file path
      await supabase
        .from('offers')
        .update({
          pdf_url: supabase.storage.from('offers').getPublicUrl(`public/${fileName}`).data.publicUrl
        })
        .eq('id', offerId)
    }

    return { data, error }
  },

  // Get offer PDF URL
  getOfferPDFUrl: (offerId: string) => {
    return supabase.storage.from('offers').getPublicUrl(`public/${offerId}.pdf`)
  }
}

// Realtime subscriptions
export const realtimeUtils = {
  // Subscribe to offers changes
  subscribeToOffers: (userId: string, callback: (payload: any) => void) => {
    return supabase
      .channel('offers')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'offers',
          filter: `organization_id=eq.${userId}`
        },
        callback
      )
      .subscribe()
  },

  // Subscribe to user profile changes
  subscribeToProfile: (userId: string, callback: (payload: any) => void) => {
    return supabase
      .channel('user_profile')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'users',
          filter: `id=eq.${userId}`
        },
        callback
      )
      .subscribe()
  }
}

// All utilities are already exported above
