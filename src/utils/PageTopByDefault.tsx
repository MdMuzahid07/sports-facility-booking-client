import { useLayoutEffect } from 'react'

const PageTopByDefault = () => {
    return (
        useLayoutEffect(() => {
            window.scrollTo({ top: 0, behavior: "smooth" })
        }, [])
    )
};

export default PageTopByDefault;