<?php
/**
 * Plugin Name: LCE – měřicí kódy
 * Description: Vkládá měřicí kódy (Meta pixel, Google Tag Manager, GA4, Google Ads, Sklik) uložené dřív jako „Vlastní kód“ v Elementor Pro. Kódy čte přímo z databáze, takže funguje i bez Elementor Pro (Claude, 261024). Na kopii staging.lcenglish.cz tento soubor záměrně není.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/*
 * ID záznamů „Vlastní kód“ (typ elementor_snippet) a kam patří.
 * 6587 = Google Analytics UA vynechán: Google UA v roce 2024 vypnul.
 */
const LCE_MERENI_KODY = array(
	6958 => 'head', // Google Tag Manager head
	6588 => 'head', // Google Analytics G4
	6260 => 'head', // Remarketing Google Ads
	6208 => 'head', // Meta pixel 552638212929820
	6959 => 'body', // Google Tag Manager body (noscript)
	6259 => 'footer', // Retargeting Sklik
);

function lce_mereni_vypis( $misto ) {
	if ( is_admin() || is_preview() || ( function_exists( 'is_customize_preview' ) && is_customize_preview() ) ) {
		return;
	}
	// Ochrana: na kopii webu nic neměřit.
	if ( false !== strpos( home_url(), 'staging.' ) ) {
		return;
	}
	foreach ( LCE_MERENI_KODY as $id => $kam ) {
		if ( $kam !== $misto ) {
			continue;
		}
		$kod = get_post_meta( $id, '_elementor_code', true );
		if ( $kod ) {
			echo "\n" . $kod . "\n"; // phpcs:ignore -- kód vložila majitelka webu
		}
	}
}

add_action( 'wp_head', function () { lce_mereni_vypis( 'head' ); }, 1 );
add_action( 'wp_body_open', function () { lce_mereni_vypis( 'body' ); }, 1 );
add_action( 'wp_footer', function () { lce_mereni_vypis( 'footer' ); }, 99 );
