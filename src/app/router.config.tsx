import { createBrowserRouter, Navigate } from "react-router";
import { MainLayout } from "./MainLayout";
import { FlowerListPage } from "@/features/flowers/flowerListPage/FlowerListPage";
import { FlowerDetailPage } from "@/features/flowers/flowerDetail/FlowerDetailPage";

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
                    path: "/flowers/:id",
                    element: <FlowerDetailPage />,
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
