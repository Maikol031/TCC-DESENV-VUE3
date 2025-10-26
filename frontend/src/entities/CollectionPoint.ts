import api from "@/services/AxiosConfig"
import type { Bucket } from "./Buckets"

export interface PointOpeningHour {
  id?: number
  point_id?: number
  day_of_week: string
  opening_hour: string
  closing_hour: string
  created_at?: string
  updated_at?: string
}


export interface Address {
  id: number
  point_id: number
  user_id: number | null
  street: string
  number: string
  neighborhood: string
  city: string
  state: string
  zipcode: string
  created_at: string
  updated_at: string
}

export interface ICollectionPoint {
  id: number
  name: string
  phone: string
  latitude?: number
  longitude?: number
  organization_id: number
  status?: "operational" | "maintenance"
  distance_km?: number
  created_at: string
  updated_at: string
  address: Partial<Address>
  days: PointOpeningHour[]
  buckets: Bucket[]
}


type QueryParam = { latitude?: number, longitude?: number, organization_id?: number, status?: string, name?: string, limit?: number, page?: number }

export default class CollectionPoint implements ICollectionPoint {

  id!: number
  name: string = ''
  phone: string = ''
  latitude?: number
  longitude?: number
  organization_id!: number
  status?: "operational" | "maintenance"
  distance_km?: number
  created_at!: string
  updated_at!: string
  address: Partial<Address> = {
    city: '',
    street: ''
  }
  days: PointOpeningHour[] = []
  buckets: Bucket[] = []


  constructor() { }

  async get(query?: QueryParam) {
    return await api.get("/api/v1/points", {
      params: query
    })
  }

  async create(body: ICollectionPoint) {
    return await api.post("/api/v1/points", body)
  }

  async delete(id: number) {
    return await api.delete(`/api/v1/points/${id}`)
  }

  async update(id: number, body: ICollectionPoint)
  {
    return await api.put(`/api/v1/points/${id}`, body)
  }

}