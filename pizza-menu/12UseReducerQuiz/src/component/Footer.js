import { memo } from 'react'
const Footer = ({ children }) => {
    return (
        <footer>{children}</footer>
    )
}

export default memo(Footer)