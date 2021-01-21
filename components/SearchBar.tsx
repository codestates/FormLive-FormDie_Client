import styles from "../styles/SearchBar.module.css";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function SearchBar() {
	return (
		<section className={styles.section1__searchBar}>
			<input />
			<FontAwesomeIcon icon={faSearch} size={"sm"} color={"#ffffff"} />
		</section>
	);
}
