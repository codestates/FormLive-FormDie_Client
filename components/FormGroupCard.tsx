import React, { FC, useState } from "react";
import { faFolder } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../styles/FormGroupCard.module.css";

interface Props {
	formId?: number;
	title: string;
	description: string;
	date: string;
	count: number;
}
const FormGroupCard: FC<Props> = ({ title, description, date, count }) => {
	const [formGroupCardViewClick, setFormGroupCardViewClick] = useState<boolean>(
		false
	);
	return (
		<section
			className={
				formGroupCardViewClick ? styles.container__click : styles.container
			}
			onClick={() => {
				setFormGroupCardViewClick(!formGroupCardViewClick);
			}}
		>
			<div className={styles.container__imgFolder}>
				<FontAwesomeIcon icon={faFolder} size={"4x"} color={"#00b050"} />
			</div>
			<section className={styles.container__text}>
				<article className={styles.container__text__title}>{title}</article>
				<section className={styles.container__text__section}>
					<article className={styles.container__text__section__description}>
						{description}
					</article>
					<article className={styles.container__text__section__count}>
						{count}+
					</article>
				</section>
				<article className={styles.container__date}>
					<div>({date} Updated)</div>
				</article>
			</section>
		</section>
	);
};

export default FormGroupCard;
