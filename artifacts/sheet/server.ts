import { createDocumentHandler } from "@/lib/artifacts/server";

// Sheet artifacts are not used in ShusthoGram - stub implementation
export const sheetDocumentHandler = createDocumentHandler<"sheet">({
  kind: "sheet",
  onCreateDocument: async () => {
    return "";
  },
  onUpdateDocument: async () => {
    return "";
  },
});
