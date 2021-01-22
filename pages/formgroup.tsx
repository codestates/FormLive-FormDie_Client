import styles from "../styles/FormGroup.module.css";
import FormGroupCard from "../components/FormGroupCard";
import Description from "../components/Description";
import {
	faChevronRight,
	faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SearchBar from "../components/SearchBar";

export default function FormGroup() {
	interface data {
		formId: number;
		title: string;
		description: string;
		date: string;
		count: number;
	}
	let formData: Array<data> = [
		{
			formId: 1,
			title: "Title1",
			description: "description1",
			date: "2021-01-20",
			count: 256,
		},
		{
			formId: 2,
			title: "Title2",
			description: "description2",
			date: "2021-01-20",
			count: 208,
		},
		{
			formId: 3,
			title: "Title3",
			description: "description3",
			date: "2021-01-20",
			count: 154,
		},
		{
			formId: 4,
			title: "Title4",
			description: "description4",
			date: "2021-01-20",
			count: 361,
		},
		{
			formId: 5,
			title: "Title5",
			description: "description5",
			date: "2021-01-20",
			count: 487,
		},
		{
			formId: 6,
			title: "청년내일체움공제",
			description: "description6",
			date: "2021-01-20",
			count: 633,
		},
		{
			formId: 7,
			title: "청년수당",
			description: "description7",
			date: "2021-01-20",
			count: 211,
		},
		{
			formId: 8,
			title: "Title8",
			description: "description8",
			date: "2021-01-20",
			count: 275,
		},
		{
			formId: 9,
			title: "Title8",
			description: "description8",
			date: "2021-01-20",
			count: 275,
		},
		{
			formId: 10,
			title: "Title8",
			description: "description8",
			date: "2021-01-20",
			count: 752,
		},
	];

	return (
		<div className={styles.container}>
			<section className={styles.section1}>
				<section className={styles.section1__topMenu}>
					<span className={styles.section1__article}>Form Group</span>
					<span className={styles.section1__sort}>
						<span>최신순</span>
						<span>|</span>
						<span>인기순</span>
					</span>
					<SearchBar />
				</section>
				<section className={styles.section1__description}>(총 56개)</section>
			</section>
			<section className={styles.section2}>
				<section className={styles.section2__left}>
					<FontAwesomeIcon icon={faChevronLeft} size={"lg"} color={"#000000"} />
				</section>
				<section className={styles.section2__formData}>
					{formData.map((data, idx) => (
						<FormGroupCard
							title={data.title}
							description={data.description}
							date={data.date}
							count={data.count}
							key={idx}
						/>
					))}
				</section>
				<section className={styles.section2__right}>
					<FontAwesomeIcon
						icon={faChevronRight}
						size={"lg"}
						color={"#000000"}
					/>
				</section>
			</section>
			<Description />
		</div>
	);
}
