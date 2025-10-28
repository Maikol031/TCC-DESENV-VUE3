import api from "@/services/AxiosConfig";

export interface Bucket {
  id?: number
  point_id?: number
  type: string
  status: string
  created_at?: string
  updated_at?: string
}

export default class Buckets implements Bucket {
    
    id?: number | undefined;
    point_id!: number;
    type!: string;
    status!: string;
    created_at?: string | undefined;
    updated_at?: string | undefined;

    constructor()
    {}

    async createBuckets(pointId: number, body: Bucket){
        await api.post(`/api/v1/points/${pointId}/buckets`, body)
    }
    
    async updateBuckets(pointId: number, id: number, body: Bucket){
        await api.put(`/api/v1/points/${pointId}/buckets/${id}`, body)
    }

    async deleteBuckets(pointId: number, id: number) {
        await api.delete(`/api/v1/points/${pointId}/buckets/${id}`)
    }


}

