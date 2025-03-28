import { createClient } from "@sanity/client";

export const client = createClient({
    projectId: '6qtjsivo',
    dataset: 'production',
    apiVersion:"2024-03-24",
    useCdn: "true",
    token: import.meta.env.VITE_SANITY_TOKEN
})