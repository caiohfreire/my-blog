import { Card, Skeleton } from "@nextui-org/react"

export const SkeletonDetail = () => {
  return (
    <Card className="flex flex-col gap-4 min-h-full space-y-5 p-4" radius="lg">

      {/* TITLE */}
      <Skeleton className="w-full rounded-lg">
        <div className="h-8 w-full rounded-lg bg-default-200"></div>
      </Skeleton>

      {/* AUTHOR */}
      <Skeleton className="flex items-center justify-center w-1/4 rounded-lg">
        <div className="h-6 w-full rounded-lg bg-default-200"></div>
      </Skeleton>

      {/* IMAGE */}
      <Skeleton className="rounded-lg">
        <div className="w-[400px] min-w-full h-[200px] min-h-full rounded-lg bg-default-300"></div>
      </Skeleton>

      {/* CONTENT */}
      <Skeleton className="w-full rounded-lg">
        <div className="h-10 w-full mt-4 rounded-lg bg-default-300"></div>
      </Skeleton>
    </Card>
  )
}