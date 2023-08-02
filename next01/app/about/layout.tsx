export default function AboutLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <nav>About nav bar</nav>
            <main>
                {children}
            </main>
        </>
    )
}
