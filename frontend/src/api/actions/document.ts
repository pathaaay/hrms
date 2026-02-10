import { apiService } from "@/lib/axios";

export const uploadDocument = async (files: FileList) => {
  const formData = new FormData();
  formData.append("file", files[0]);
  const res = await apiService.post(
    "/document",
    {
      file: formData.get("file"),
    },
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );
  return res;
};
