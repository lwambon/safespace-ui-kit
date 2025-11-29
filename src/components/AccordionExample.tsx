import React from "react";
import { AccordionWithBackend } from "@/components/ui/accordion-with-backend";

/**
 * Example usage of AccordionWithBackend component
 * This component demonstrates how to integrate the accordion with backend data
 */

export const AccordionExample = () => {
  const handleOpenChange = (openItems: string[]) => {
    console.log("Opened items:", openItems);
    // You can perform additional actions here when accordion items are opened/closed
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Help & Support</h1>

      {/* Basic accordion - fetches all sections */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">General Help</h2>
        <AccordionWithBackend onOpenChange={handleOpenChange} />
      </div>

      {/* Accordion filtered by category */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Emergency Resources</h2>
        <AccordionWithBackend
          category="emergency"
          onOpenChange={handleOpenChange}
        />
      </div>

      {/* Another category */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Frequently Asked Questions</h2>
        <AccordionWithBackend
          category="faq"
          onOpenChange={handleOpenChange}
        />
      </div>
    </div>
  );
};

export default AccordionExample;
