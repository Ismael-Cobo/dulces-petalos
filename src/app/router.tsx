import { RouterProvider } from "react-router/dom";
import { createAppRouter } from "./router.config";

export const AppRouter = () => {
    const router = createAppRouter();
    return <RouterProvider router={router} />;
};
