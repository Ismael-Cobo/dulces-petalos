import { createBrowserRouter, Navigate } from "react-router";
import { MainLayout } from "./MainLayout";
import { FlowerListPage } from "@/features/flowers/FlowerListPage";

export const createAppRouter = () =>
    createBrowserRouter([
        {
            path: "",
            element: <MainLayout />,
            children: [
                {
                    path: "/",
                    element: <FlowerListPage />,
                },
                {
                    path: "*",
                    element: <Navigate to="/" replace />,
                },
            ],
        },
        {
            path: "*",
            element: <Navigate to="/" />,
        },
    ]);
