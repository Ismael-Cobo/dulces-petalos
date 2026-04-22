// import { apiClient } from "@/lib/api-client";
import { type Result } from "@/lib/result";
import { FLOWER_DATA } from "../../data/data";
import type { Flower } from "../../models/flower.model";

// TODO: reemplazar mocks por llamadas reales cuando el CORS esté resuelto
// export const getFlower = (id: string): Promise<Result<Flower>> =>
//     apiClient.get<Flower>(`/product/${id}`);
export const getFlower = (id: string): Promise<Result<Flower>> => {
    const flower = FLOWER_DATA.find((f) => f.id === id);
    if (flower) return Promise.resolve({ ok: true, data: flower, error: null });
    return Promise.resolve({ ok: false, data: null, error: { message: "Flor no encontrada", statusCode: 404 } });
};
