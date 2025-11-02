import { createDocumentHandler } from "@/lib/artifacts/server";

// Text artifacts are not used in ShusthoGram - stub implementation
export const textDocumentHandler = createDocumentHandler<"text">({
  kind: "text",
  onCreateDocument: async () => {
    return "";
  },
  onUpdateDocument: async () => {
    return "";
  },
});
