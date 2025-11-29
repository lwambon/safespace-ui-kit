import { AccordionSection } from "@/components/ui/accordion-with-backend";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const accordionServices = {
  // Fetch all accordion sections
  getAllSections: async (): Promise<AccordionSection[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/accordion/sections`);
      if (!response.ok) throw new Error("Failed to fetch sections");
      const result = await response.json() as { data: AccordionSection[] };
      return result.data || [];
    } catch (error) {
      console.error("Error fetching accordion sections:", error);
      throw error;
    }
  },

  // Fetch accordion sections by category
  getSectionsByCategory: async (category: string): Promise<AccordionSection[]> => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/accordion/sections?category=${category}`
      );
      if (!response.ok) throw new Error("Failed to fetch sections");
      const result = await response.json() as { data: AccordionSection[] };
      return result.data || [];
    } catch (error) {
      console.error("Error fetching accordion sections:", error);
      throw error;
    }
  },

  // Fetch single accordion section
  getSectionById: async (id: number): Promise<AccordionSection> => {
    try {
      const response = await fetch(`${API_BASE_URL}/accordion/sections/${id}`);
      if (!response.ok) throw new Error("Failed to fetch section");
      const result = await response.json() as { data: AccordionSection };
      return result.data;
    } catch (error) {
      console.error("Error fetching accordion section:", error);
      throw error;
    }
  },

  // Create accordion section (admin only)
  createSection: async (
    section: Omit<AccordionSection, "id" | "created_at" | "updated_at">
  ): Promise<number> => {
    try {
      const response = await fetch(`${API_BASE_URL}/accordion/sections`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify(section),
      });
      if (!response.ok) throw new Error("Failed to create section");
      const result = await response.json() as { id: number };
      return result.id;
    } catch (error) {
      console.error("Error creating accordion section:", error);
      throw error;
    }
  },

  // Update accordion section (admin only)
  updateSection: async (
    id: number,
    section: Partial<AccordionSection>
  ): Promise<void> => {
    try {
      const response = await fetch(`${API_BASE_URL}/accordion/sections/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify(section),
      });
      if (!response.ok) throw new Error("Failed to update section");
    } catch (error) {
      console.error("Error updating accordion section:", error);
      throw error;
    }
  },

  // Delete accordion section (admin only)
  deleteSection: async (id: number): Promise<void> => {
    try {
      const response = await fetch(`${API_BASE_URL}/accordion/sections/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      if (!response.ok) throw new Error("Failed to delete section");
    } catch (error) {
      console.error("Error deleting accordion section:", error);
      throw error;
    }
  },

  // Get user accordion preferences
  getUserPreferences: async (userId: string): Promise<{ open_items: string[]; theme: string; expanded_by_default: boolean }> => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/accordion/preferences/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      if (!response.ok) throw new Error("Failed to fetch preferences");
      const result = await response.json() as { data: { open_items: string[]; theme: string; expanded_by_default: boolean } };
      return result.data;
    } catch (error) {
      console.error("Error fetching user preferences:", error);
      throw error;
    }
  },

  // Save user accordion preferences
  saveUserPreferences: async (
    userId: string,
    preferences: {
      open_items: string[];
      theme: string;
      expanded_by_default: boolean;
    }
  ): Promise<void> => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/accordion/preferences/${userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
          body: JSON.stringify(preferences),
        }
      );
      if (!response.ok) throw new Error("Failed to save preferences");
    } catch (error) {
      console.error("Error saving user preferences:", error);
      throw error;
    }
  },
};
