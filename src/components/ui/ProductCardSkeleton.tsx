

export default function ProductCardSkeleton() {
    return (
        <div className="flex items-center justify-center pr-2">
            <div className="flex flex-col gap-1 h-full top-products-card animate-pulse">
                <div className="overflow-hidden aspect-square flex justify-center items-center top-products-img-box bg-gray-300 rounded-md" />
                <div className="px-2 w-full flex flex-col items-center text-center min-h-20">
                    <div className="h-4 w-32 bg-gray-300 rounded-md mb-2" />
                    <div className="flex items-center gap-3">
                        <div className="h-4 w-16 bg-gray-300 rounded-md" />
                        <div className="h-4 w-16 bg-gray-300 rounded-md" />
                    </div>
                </div>
            </div>
        </div>
    )
}
