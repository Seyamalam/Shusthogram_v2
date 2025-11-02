import { createDocumentHandler } from "@/lib/artifacts/server";

// Code artifacts are not used in ShusthoGram - stub implementation
export const codeDocumentHandler = createDocumentHandler<"code">({
  kind: "code",
  onCreateDocument: async () => {
    return "";
  },
  onUpdateDocument: async () => {
    return "";
  },
});
