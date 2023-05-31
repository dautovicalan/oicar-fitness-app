import { renderHook } from "@testing-library/react";
import useFetch from "../useFetch";

global.fetch = jest.fn();

describe("useFetch", () => {
  it("should return the initial values for data, error and loading", async () => {
    const { result } = renderHook(() => useFetch());
    const { data, isPending, error } = result.current;

    expect(data).toBe(null);
    expect(error).toBe(null);
    expect(isPending).toBe(true);
  });
  xit("should return the data and set loading to false when the request is successful", async () => {
    const data = { id: 1, name: "Apple" };
    fetch.mockResolvedValueOnce({
      json: () => Promise.resolve(data),
    });
    const { result, waitForNextUpdate } = renderHook(() =>
      useFetch("http://localhost:5280/api/Food/GetById?idFood=1")
    );
    await waitForNextUpdate();
    const { data: resultData, loading } = result.current;

    expect(resultData).toBe(data);
    expect(loading).toBe(false);
  });
});
