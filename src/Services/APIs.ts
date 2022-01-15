import { supabase } from "../supabaseClient"

type Message = {
	id?: number
	created_at: Date
	content: string
	room: number
	user: string
}

export const getUserRooms = async (user_id: string) => {
	try {
		const { data, error }: { data: any; error: any } = await supabase.from("userHasRoom").select("*").eq("user", user_id)
		if (error) throw Error
		return data
	} catch (error) {
		return error
	}
}

export const getRoom = async (room_id: string) => {
	try {
		const { data, error } = await supabase.from("userHasRoom").select("*, user!inner(*)").eq("room", room_id)
		if (error) throw Error
		return data
	} catch (error) {
		return error
	}
}

export const getRoomMessages = async (room_id: string) => {
	try {
		const { data, error } = await supabase.from("message").select("*").eq("room", room_id).order("created_at", { ascending: false })
		if (error) throw Error
		return data
	} catch (error) {
		return error
	}
}

export const createMessage = async (messageData: Message) => {
	try {
		const { data, error } = await supabase.from("message").insert(messageData)
		if (error) throw Error
		return data
	} catch (error) {
		return error
	}
}

export const updateRoomMessages = async (messageData: Message[]) => {
	try {
		const { data, error } = await supabase.from("message").upsert(messageData)
		if (error) throw Error
		return data
	} catch (error) {
		return error
	}
}
