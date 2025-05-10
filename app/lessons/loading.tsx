import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

export default function Loading() {
  return (
    <div className="container max-w-6xl mx-auto px-4 py-6 md:py-10">
      <Skeleton className="h-4 w-24 mb-4" />

      <div className="mb-6">
        <Skeleton className="h-8 w-48 mb-2" />
        <Skeleton className="h-4 w-full max-w-md mb-4" />
      </div>

      {/* Featured Lesson Skeleton */}
      <div className="mb-8">
        <Skeleton className="h-6 w-40 mb-4" />
        <Card>
          <div className="aspect-video w-full">
            <Skeleton className="h-full w-full" />
          </div>
          <CardHeader>
            <Skeleton className="h-6 w-3/4 mb-2" />
            <Skeleton className="h-4 w-full" />
          </CardHeader>
          <CardContent className="flex gap-2">
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-6 w-20" />
          </CardContent>
          <CardFooter>
            <Skeleton className="h-10 w-full" />
          </CardFooter>
        </Card>
      </div>

      {/* Search and Filters Skeleton */}
      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <Skeleton className="h-10 flex-1" />
        <Skeleton className="h-10 w-32" />
      </div>

      {/* Category Pills Skeleton */}
      <div className="flex flex-wrap gap-2 mb-6">
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <Skeleton key={i} className="h-8 w-24" />
          ))}
      </div>

      {/* Tabs Skeleton */}
      <div className="mb-6">
        <Skeleton className="h-10 w-full" />
      </div>

      {/* Lessons Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array(6)
          .fill(0)
          .map((_, i) => (
            <Card key={i}>
              <div className="aspect-video w-full">
                <Skeleton className="h-full w-full" />
              </div>
              <CardHeader>
                <Skeleton className="h-5 w-3/4 mb-2" />
                <Skeleton className="h-4 w-full" />
              </CardHeader>
              <CardContent className="flex gap-2">
                <Skeleton className="h-5 w-16" />
                <Skeleton className="h-5 w-16" />
              </CardContent>
              <CardFooter>
                <Skeleton className="h-8 w-full" />
              </CardFooter>
            </Card>
          ))}
      </div>
    </div>
  )
}
