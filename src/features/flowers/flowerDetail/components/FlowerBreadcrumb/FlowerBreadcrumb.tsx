import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb/Breadcrumb";
import type { FC } from "react";
import { Link } from "react-router";

type FlowerBreadcrumbProps = {
    name: string;
};

export const FlowerBreadcrumb: FC<FlowerBreadcrumbProps> = ({ name }) => {
    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink render={<Link to="/">Inicio</Link>} />
                </BreadcrumbItem>
                <BreadcrumbItem>
                    <BreadcrumbSeparator />
                </BreadcrumbItem>
                <BreadcrumbItem>
                    <BreadcrumbPage>{name}</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    );
};
