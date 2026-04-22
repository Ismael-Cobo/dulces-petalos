// import { apiClient } from "@/lib/api-client";
import { type Result } from "@/lib/result";
import { type Flower } from "../models/flower.model";
import { FLOWER_DATA } from "../data/data";

// TODO: reemplazar mocks por llamadas reales cuando el CORS esté resuelto
// export const getFlowerList = (params?: string): Promise<Result<Flower[]>> =>
//     apiClient.get<Flower[]>("/product", { params });
export const getFlowerList = (): Promise<Result<Flower[]>> =>
    Promise.resolve({ ok: true, data: FLOWER_DATA, error: null });

// TODO: reemplazar mocks por llamadas reales cuando el CORS esté resuelto
// export const getFlower = (id: string): Promise<Result<Flower>> =>
//     apiClient.get<Flower>(`/product/${id}`);
export const getFlower = (id: string): Promise<Result<Flower>> => {
    const flower = FLOWER_DATA.find((f) => f.id === id);
    if (flower) return Promise.resolve({ ok: true, data: flower, error: null });
    return Promise.resolve({ ok: false, data: null, error: { message: "Flor no encontrada", statusCode: 404 } });
};
