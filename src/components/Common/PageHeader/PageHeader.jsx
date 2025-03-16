import styles from "./PageHeader.styles";

function PageHeader({ title = '', subTitle = '' }) {

    return (
        <div style={styles.content}>
            {title && <h1>{title}</h1>}
            {subTitle && <h2>{subTitle}</h2>}
        </div>
    );
}

export default PageHeader;
