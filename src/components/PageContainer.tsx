type PageContainerProps = {
    children: React.ReactNode;
}

export function PageContainer(props: PageContainerProps) {
    return (
        <div className="page-container">
            {props.children}
        </div>
    )
}