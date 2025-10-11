import { supabase } from './supabase';

// Cache voor API responses
const apiCache = new Map<string, { data: any; timestamp: number }>();
const CACHE_DURATION = 60 * 1000; // 1 minuut in milliseconden

// Type voor API response
type ApiResponse<T> = {
  data: T | null;
  error: string | null;
  status: number;
};

// Generieke fetch functie met caching en error handling
async function fetchWithCache<T>(
  cacheKey: string,
  fetchFn: () => Promise<{ data: T | null; error: any }>,
  skipCache = false
): Promise<ApiResponse<T>> {
  try {
    // Check cache als we niet expliciet de cache overslaan
    if (!skipCache) {
      const cachedData = apiCache.get(cacheKey);
      const now = Date.now();
      
      if (cachedData && now - cachedData.timestamp < CACHE_DURATION) {
        console.log(`[API] Using cached data for ${cacheKey}`);
        return { data: cachedData.data, error: null, status: 200 };
      }
    }

    // Fetch data
    const { data, error } = await fetchFn();

    // Handle error
    if (error) {
      console.error(`[API] Error fetching ${cacheKey}:`, error);
      return { 
        data: null, 
        error: error.message || 'Er is een fout opgetreden', 
        status: error.status || 500 
      };
    }

    // Cache resultaat
    apiCache.set(cacheKey, { data, timestamp: Date.now() });
    
    return { data, error: null, status: 200 };
  } catch (error: any) {
    console.error(`[API] Unexpected error for ${cacheKey}:`, error);
    return { 
      data: null, 
      error: error.message || 'Er is een onverwachte fout opgetreden', 
      status: 500 
    };
  }
}

// API functies voor klanten
export const customersApi = {
  // Haal alle klanten op
  getAll: async (skipCache = false): Promise<ApiResponse<any[]>> => {
    return fetchWithCache<any[]>(
      'customers:all',
      async () => {
        const { data, error } = await supabase
          .from('customers')
          .select('*')
          .order('name', { ascending: true });
        
        return { data, error };
      },
      skipCache
    );
  },

  // Haal een specifieke klant op
  getById: async (id: string, skipCache = false): Promise<ApiResponse<any>> => {
    return fetchWithCache<any>(
      `customers:${id}`,
      async () => {
        const { data, error } = await supabase
          .from('customers')
          .select('*')
          .eq('id', id)
          .single();
        
        return { data, error };
      },
      skipCache
    );
  },

  // Maak een nieuwe klant aan
  create: async (customerData: any): Promise<ApiResponse<any>> => {
    try {
      const { data, error } = await supabase
        .from('customers')
        .insert(customerData)
        .select()
        .single();
      
      if (error) {
        return { data: null, error: error.message, status: 500 };
      }
      
      // Invalidate cache
      apiCache.delete('customers:all');
      
      return { data, error: null, status: 201 };
    } catch (error: any) {
      return { 
        data: null, 
        error: error.message || 'Fout bij het aanmaken van de klant', 
        status: 500 
      };
    }
  },

  // Update een klant
  update: async (id: string, customerData: any): Promise<ApiResponse<any>> => {
    try {
      const { data, error } = await supabase
        .from('customers')
        .update(customerData)
        .eq('id', id)
        .select()
        .single();
      
      if (error) {
        return { data: null, error: error.message, status: 500 };
      }
      
      // Invalidate cache
      apiCache.delete('customers:all');
      apiCache.delete(`customers:${id}`);
      
      return { data, error: null, status: 200 };
    } catch (error: any) {
      return { 
        data: null, 
        error: error.message || 'Fout bij het bijwerken van de klant', 
        status: 500 
      };
    }
  },

  // Verwijder een klant
  delete: async (id: string): Promise<ApiResponse<null>> => {
    try {
      const { error } = await supabase
        .from('customers')
        .delete()
        .eq('id', id);
      
      if (error) {
        return { data: null, error: error.message, status: 500 };
      }
      
      // Invalidate cache
      apiCache.delete('customers:all');
      apiCache.delete(`customers:${id}`);
      
      return { data: null, error: null, status: 200 };
    } catch (error: any) {
      return { 
        data: null, 
        error: error.message || 'Fout bij het verwijderen van de klant', 
        status: 500 
      };
    }
  }
};

// API functies voor facturen
export const invoicesApi = {
  // Haal alle facturen op
  getAll: async (skipCache = false): Promise<ApiResponse<any[]>> => {
    return fetchWithCache<any[]>(
      'invoices:all',
      async () => {
        const { data, error } = await supabase
          .from('invoices')
          .select(`
            *,
            customers (
              id,
              name,
              email
            )
          `)
          .order('created_at', { ascending: false });
        
        return { data, error };
      },
      skipCache
    );
  },

  // Haal een specifieke factuur op
  getById: async (id: string, skipCache = false): Promise<ApiResponse<any>> => {
    return fetchWithCache<any>(
      `invoices:${id}`,
      async () => {
        const { data, error } = await supabase
          .from('invoices')
          .select(`
            *,
            customers (
              id,
              name,
              email
            )
          `)
          .eq('id', id)
          .single();
        
        return { data, error };
      },
      skipCache
    );
  },

  // Maak een nieuwe factuur aan
  create: async (invoiceData: any): Promise<ApiResponse<any>> => {
    try {
      const { data, error } = await supabase
        .from('invoices')
        .insert(invoiceData)
        .select()
        .single();
      
      if (error) {
        return { data: null, error: error.message, status: 500 };
      }
      
      // Invalidate cache
      apiCache.delete('invoices:all');
      
      return { data, error: null, status: 201 };
    } catch (error: any) {
      return { 
        data: null, 
        error: error.message || 'Fout bij het aanmaken van de factuur', 
        status: 500 
      };
    }
  },

  // Update een factuur
  update: async (id: string, invoiceData: any): Promise<ApiResponse<any>> => {
    try {
      const { data, error } = await supabase
        .from('invoices')
        .update(invoiceData)
        .eq('id', id)
        .select()
        .single();
      
      if (error) {
        return { data: null, error: error.message, status: 500 };
      }
      
      // Invalidate cache
      apiCache.delete('invoices:all');
      apiCache.delete(`invoices:${id}`);
      
      return { data, error: null, status: 200 };
    } catch (error: any) {
      return { 
        data: null, 
        error: error.message || 'Fout bij het bijwerken van de factuur', 
        status: 500 
      };
    }
  },

  // Verwijder een factuur
  delete: async (id: string): Promise<ApiResponse<null>> => {
    try {
      const { error } = await supabase
        .from('invoices')
        .delete()
        .eq('id', id);
      
      if (error) {
        return { data: null, error: error.message, status: 500 };
      }
      
      // Invalidate cache
      apiCache.delete('invoices:all');
      apiCache.delete(`invoices:${id}`);
      
      return { data: null, error: null, status: 200 };
    } catch (error: any) {
      return { 
        data: null, 
        error: error.message || 'Fout bij het verwijderen van de factuur', 
        status: 500 
      };
    }
  }
};

// Functie om de cache te wissen
export const clearApiCache = () => {
  apiCache.clear();
  console.log('[API] Cache cleared');
};