import React, { useState, useEffect } from "react";
import { accordionServices } from "@/components/services/accordionServices";
import { AccordionSection } from "@/components/ui/accordion-with-backend";

/**
 * Admin Panel for managing accordion sections
 * Allows admins to create, edit, and delete accordion content
 */

export const AccordionAdmin = () => {
  const [sections, setSections] = useState<AccordionSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "general",
    display_order: 0,
    is_active: true,
  });

  // Fetch sections on mount
  useEffect(() => {
    fetchSections();
  }, []);

  const fetchSections = async () => {
    try {
      setLoading(true);
      const data = await accordionServices.getAllSections();
      setSections(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch sections");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.content) {
      setError("Title and content are required");
      return;
    }

    try {
      if (editingId) {
        await accordionServices.updateSection(editingId, formData);
      } else {
        await accordionServices.createSection(
          formData as Omit<AccordionSection, "id" | "created_at" | "updated_at">
        );
      }

      await fetchSections();
      resetForm();
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save section");
    }
  };

  const handleEdit = (section: AccordionSection) => {
    setFormData({
      title: section.title,
      content: section.content,
      category: section.category,
      display_order: section.display_order,
      is_active: section.is_active,
    });
    setEditingId(section.id);
    setIsEditing(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this section?")) {
      try {
        await accordionServices.deleteSection(id);
        await fetchSections();
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to delete section");
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      content: "",
      category: "general",
      display_order: 0,
      is_active: true,
    });
    setEditingId(null);
    setIsEditing(false);
  };

  if (loading) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Accordion Management</h1>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md text-red-800">
          {error}
        </div>
      )}

      {/* Form */}
      <div className="mb-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
        <h2 className="text-xl font-semibold mb-4">
          {isEditing ? "Edit Section" : "Create New Section"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Content</label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              rows={6}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="general">General</option>
                <option value="help">Help</option>
                <option value="faq">FAQ</option>
                <option value="emergency">Emergency</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Display Order
              </label>
              <input
                type="number"
                name="display_order"
                value={formData.display_order}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-end">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="is_active"
                  checked={formData.is_active}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                <span className="text-sm font-medium">Active</span>
              </label>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              {isEditing ? "Update" : "Create"} Section
            </button>
            {isEditing && (
              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Sections List */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Current Sections</h2>
        {sections.length === 0 ? (
          <p className="text-gray-500">No sections found</p>
        ) : (
          <div className="space-y-2">
            {sections.map((section) => (
              <div
                key={section.id}
                className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">{section.title}</h3>
                    <p className="text-sm text-gray-500">
                      Category: {section.category} | Order: {section.display_order}
                    </p>
                  </div>
                  <div className="text-right">
                    <span
                      className={`inline-block px-2 py-1 rounded text-xs font-semibold mr-2 ${
                        section.is_active
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {section.is_active ? "Active" : "Inactive"}
                    </span>
                  </div>
                </div>
                <p className="text-gray-700 mb-3 line-clamp-2">
                  {section.content}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(section)}
                    className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(section.id)}
                    className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AccordionAdmin;
