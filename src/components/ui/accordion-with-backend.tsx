import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "lucide-react";
import { cn } from "@/lib/utils";

// UI Components
function Accordion({
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return <AccordionPrimitive.Root data-slot="accordion" {...props} />;
}

function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("border-b last:border-b-0", className)}
      {...props}
    />
  );
}

function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180",
          className,
        )}
        {...props}
      >
        {children}
        <ChevronDownIcon className="text-muted-foreground pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-200" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm"
      {...props}
    >
      <div className={cn("pt-0 pb-4", className)}>{children}</div>
    </AccordionPrimitive.Content>
  );
}

// Enhanced Component with Backend Integration
interface AccordionSection {
  id: number;
  title: string;
  content: string;
  display_order: number;
  is_active: boolean;
  category: string;
}

interface AccordionWithBackendProps {
  category?: string;
  onOpenChange?: (openItems: string[]) => void;
}

function AccordionWithBackend({
  category,
  onOpenChange,
}: AccordionWithBackendProps) {
  const [sections, setSections] = React.useState<AccordionSection[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [openItems, setOpenItems] = React.useState<string[]>([]);

  // Fetch accordion sections from backend
  React.useEffect(() => {
    const fetchSections = async () => {
      try {
        setLoading(true);
        const endpoint = category
          ? `/api/accordion/sections?category=${category}`
          : "/api/accordion/sections";
        
        const response = await fetch(endpoint);
        if (!response.ok) throw new Error("Failed to fetch sections");
        
        const data = await response.json();
        setSections(data.data || []);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        setSections([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSections();
  }, [category]);

  // Fetch user preferences
  React.useEffect(() => {
    const fetchPreferences = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) return;

        const response = await fetch(`/api/accordion/preferences/${userId}`);
        if (!response.ok) return;

        const data = await response.json();
        if (data.data?.open_items) {
          setOpenItems(data.data.open_items);
        }
      } catch (err) {
        console.error("Failed to fetch preferences:", err);
      }
    };

    fetchPreferences();
  }, []);

  // Handle open items change and save to backend
  const handleOpenChange = (value: string | string[]) => {
    const newOpenItems = Array.isArray(value) ? value : [value];
    setOpenItems(newOpenItems);

    // Save preferences to backend
    const savePreferences = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) return;

        await fetch(`/api/accordion/preferences/${userId}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            open_items: newOpenItems,
            theme: localStorage.getItem("theme") || "light",
            expanded_by_default: false,
          }),
        });
      } catch (err) {
        console.error("Failed to save preferences:", err);
      }
    };

    savePreferences();
    onOpenChange?.(newOpenItems);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-md text-red-800">
        Error: {error}
      </div>
    );
  }

  if (sections.length === 0) {
    return (
      <div className="p-4 text-center text-muted-foreground">
        No accordion sections available
      </div>
    );
  }

  return (
    <Accordion
      type="multiple"
      value={openItems}
      onValueChange={handleOpenChange}
      className="w-full"
    >
      {sections
        .filter((section) => section.is_active)
        .sort((a, b) => a.display_order - b.display_order)
        .map((section) => (
          <AccordionItem key={section.id} value={`item-${section.id}`}>
            <AccordionTrigger>{section.title}</AccordionTrigger>
            <AccordionContent>{section.content}</AccordionContent>
          </AccordionItem>
        ))}
    </Accordion>
  );
}

export {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  AccordionWithBackend,
  type AccordionSection,
  type AccordionWithBackendProps,
};
