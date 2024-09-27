import { http, HttpResponse } from "msw";
import { getMockData, MockDataResponse } from "./mockData";

export const handler = [
    http.get("/api/products", async ({ request }) => {
        const url = new URL(request.url);
        const page = Number(url.searchParams.get("page")) || 1;
        const response = await getMockData(page);

        return HttpResponse.json<MockDataResponse>(response, {
            status: 200,
            statusText: "OK",
        });
    }),
];
