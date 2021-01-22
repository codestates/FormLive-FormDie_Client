import React, { FC, useState } from "react";
import styles from "../styles/FormCard.module.css";

interface Props {
	formId: number;
	title: string;
	description: string;
	updated_at: string;
}

const FormCard: FC<Props> = ({ formId, title, description, updated_at }) => {
	const [formViewClick, setFormViewClick] = useState<boolean>(false);
	console.log("hello ", formId);
	return (
		<section
			className={
				formViewClick
					? styles.section2__formView__click
					: styles.section2__formView
			}
			onClick={() => {
				setFormViewClick(!formViewClick);
			}}
		>
			<div className={styles.section2__formView__formId}>
				<div>{formId < 10 ? "0" + formId : formId}</div>
			</div>
			<section className={styles.section2__formView__text}>
				<div className={styles.section2__formView__text__title}>{title}</div>
				<div className={styles.section2__formView__text__main}>
					<div>{description}</div>
					<div>{updated_at}</div>
				</div>
			</section>
		</section>
	);
};

export default FormCard;
