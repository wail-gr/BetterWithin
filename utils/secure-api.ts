import { tokenManager, aiSafety, securityMonitoring } from "./security-utils"

// Secure API wrapper
export const secureApi = {
  // Make a secure API request
  request: async <T>(\
    url: string,
    method: string = "GET",
    data?: any,
    options: { anonymize?: boolean;
requireAuth?: boolean
} =
{
}
): Promise<T> =>
{
  try {
    // Get auth token if authentication is required
    const token = options.requireAuth ? tokenManager.getToken() : null

    // If authentication is required but no token is available, throw an error
    if (options.requireAuth && !token) {
      throw new Error("Authentication required")
    }

    // Prepare headers
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    }

    // Add auth token if available
    if (token) {
      headers["Authorization"] = `Bearer ${token}`
    }

    // Add CSRF token
    const csrfToken = Math.random().toString(36).substring(2)
    headers["x-csrf-token"] = csrfToken

    // Prepare request options
    const requestOptions: RequestInit = {
      method,
      headers,
      credentials: "include", // Include cookies
    }

    // Add body if data is provided
    if (data) {
      // Anonymize data if requested
      const processedData = options.anonymize
        ? aiSafety.anonymizePrompt(JSON.stringify(data), { name: "User", email: "user@example.com" })
        : JSON.stringify(data)

      requestOptions.body = processedData
    }

    // Make the request
    const response = await fetch(url, requestOptions)

    // Handle non-OK responses
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.error || `Request failed with status ${response.status}`)
    }

    // Parse and return the response
    const responseData = await response.json()

    // If this is an AI response, filter it for safety
    if (url.includes("/api/ai") || url.includes("/api/recommend")) {
      // Apply safety filters to AI responses
      if (responseData.text) {
        responseData.text = aiSafety.filterResponse(responseData.text)
      }
      if (responseData.recommendations) {
        responseData.recommendations = responseData.recommendations.map((rec: any) => ({
          ...rec,
          content: aiSafety.filterResponse(rec.content),
        }))
      }
    }

    return responseData as T
  } catch (error) {
    // Log the error
    securityMonitoring.logEvent("API_REQUEST_ERROR", { url, error })
    throw error
  }
}
,
  
  // Convenience methods
  get: <T>(url: string, options?:
{
  anonymize?: boolean;
  requireAuth?: boolean
}
): Promise<T> =>
{
  return secureApi.request<T>(url, "GET", undefined, options)
}
,
  
  post: <T>(url: string, data: any, options?:
{
  anonymize?: boolean;
  requireAuth?: boolean
}
): Promise<T> =>
{
  return secureApi.request<T>(url, "POST", data, options)
}
,
  
  put: <T>(url: string, data: any, options?:
{
  anonymize?: boolean;
  requireAuth?: boolean
}
): Promise<T> =>
{
  return secureApi.request<T>(url, "PUT", data, options)
}
,
  
  delete: <T>(url: string, options?:
{
  anonymize?: boolean;
  requireAuth?: boolean
}
): Promise<T> =>
{
  return secureApi.request<T>(url, "DELETE", undefined, options)
}
}
