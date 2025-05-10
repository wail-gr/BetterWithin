import * as React from "react"

const ChartTooltip = () => {
  return null
}

export { ChartTooltip }

interface ChartProps extends React.HTMLAttributes<HTMLDivElement> {}

const Chart = React.forwardRef<HTMLDivElement, ChartProps>(({ className, ...props }, ref) => {
  return <div className={className} ref={ref} {...props} />
})
Chart.displayName = "Chart"

export { Chart }
