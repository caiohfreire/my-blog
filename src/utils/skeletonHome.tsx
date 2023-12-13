import { Card, Skeleton } from "@nextui-org/react"


export const SkeletonHome = () => {
  return (
    <Card className="grid grid-cols-2 gap-4 min-h-full space-y-5 p-4 mx-4" radius="lg">

      {/* IMAGE */}
      <Skeleton className="rounded-lg">
        <div className="w-[400px] min-w-full h-[200px] min-h-full rounded-lg bg-default-300"></div>
      </Skeleton>
      <div className="space-y-3">

        {/* TITLE */}
        <Skeleton className="w-full rounded-lg">
          <div className="h-8 w-full rounded-lg bg-default-200"></div>
        </Skeleton>

        {/* AUTHOR */}
        <Skeleton className="w-1/4 rounded-lg">
          <div className="h-6 w-full rounded-lg bg-default-200"></div>
        </Skeleton>

        {/* SUMMARY */}
        <Skeleton className="w-full rounded-lg">
          <div className="h-6 w-full rounded-lg bg-default-300"></div>
        </Skeleton>

        {/* BUTTON */}
        <Skeleton className="w-full rounded-lg">
          <div className="h-10 w-full mt-4 rounded-lg bg-default-300"></div>
        </Skeleton>
      </div>
    </Card>
  )
}