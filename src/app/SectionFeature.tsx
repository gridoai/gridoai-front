function SectionFeature({ feature }: { feature: { title: string; description: string; }; }) {
    return <div className="flex flex-col md:flex-row items-center justify-between gap-8">

        <div className="h-60  flex flex-col">
            <h3 className="text-4xl font-bold mb-4">{feature.title}</h3>
            <p className="text-lg">{feature.description}</p>
        </div>
        <div className="aspect-square h-96 bg-card rounded-lg">

        </div>
    </div>;
}
