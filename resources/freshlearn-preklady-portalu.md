# FreshLearn – české popisky portálu studentů

**K čemu:** portál `kurzy.lcenglish.cz/member` má jazyk „Czech“ (id 640), ale FreshLearn do něj neumí doplnit popisky, které přidal později. Chybějící klíče se ukazují anglicky. Tady je návrh češtiny ke schválení (261027, projekt [[lcenglish-freshlearn-revize]]).

**Jak to funguje:** výchozí anglické texty jsou v kódu portálu (`chunk-4QH75P3Q.js`, objekt po stránkách `dash_board`, `course_info`…), vlastní texty jazyka si portál stahuje z `fs-readonly-api.freshlearn.com/v1/api/public/custom-text/<stránka>/language/640` a slučuje přes angličtinu. Co v češtině chybí, zůstane anglicky. Stav 261027: 303 popisků česky, 571 chybí.

**Rozsah:** překládám, na co student LCEnglish narazí. Vynechávám funkce, které LCEnglish nepoužívá: partnerský program (`affiliate`, 114), pokladnu FreshLearn (`checkout_course`, 34, žádná platební brána), masterclass (23), dvoufázové ověření (`mfa`, 10), externí lekce AICC/SCORM (~45) a neúspěšné platby předplatného. Kdyby se některá z nich zapnula, doplní se.

**Nasazeno 261027 (Lenka schválila):** úprava překladů ve FreshLearn (Settings → Languages) je za tarifem No Brainer Plus, proto češtinu doplňuje skript `<script id="lce-cestina">` v Settings → Custom Script → Member Portal → In Head Section (pod stylem `lce-paper`). Skript zachytí odpověď s texty jazyka a doplní do ní klíče z této tabulky; obsahu lekcí se nedotkne.

**Změna popisku:** upravit tabulku, slovník převést skriptem (tabulka → JSON, stránka z nadpisu sekce nebo z prefixu klíče, řádky se shodným EN a CZ a kurzívou se vynechají), v administraci nahradit objekt `var CZ = {…}` ve skriptu, Update, pak smazat mezipaměť profilu (`DELETE https://fs-readonly-api.freshlearn.com/v1/api/cache/company-profile?domainId=17745` s hlavičkou Authorization z administrace), jinak portál drží starou verzi. Ověření: v portálu `window.__lceCestinaApplied` ≥ 1.

**Pravidlo psaní:** vykání s malým v uprostřed věty (váš, vám), velké jen na začátku popisku.

Sloupec „Česky“ = nasazené znění.

## Knihovna a menu (`dash_board`)

| Klíč | Anglicky | Česky |
|---|---|---|
| myLibrary | My Library | Moje kurzy |
| explore | Explore | Další kurzy |
| exploreProducts | Explore Products | Další kurzy |
| achievements | Achievements | Certifikáty |
| all | All | Vše |
| dashboard | Dashboard | Přehled |
| openCommunity | Open community | Otevřít komunitu |
| bundleCommunityDesc | This bundle includes access to the community. Join the conversation with other members. | Balíček zahrnuje přístup do komunity. Zapojte se do rozhovoru s ostatními. |
| bundleCommunityInfo | Includes the community and all its groups as one item | Zahrnuje komunitu se všemi skupinami |
| productbundleAccess | Access Bundle | Otevřít balíček |
| cohort | Cohort | Skupina |
| links | Links | Odkazy |
| pointsBalance | Points Balance | Stav bodů |
| totalPointsEarned | Total points earned | Získané body celkem |
| rewards | Rewards | Odměny |
| shareYourThoughts | Share your thoughts | Napište nám, co si myslíte |
| shareThoughtsSubtitle | Help us improve your experience. | Pomůžete nám kurzy zlepšit. |
| searchLibrary | Search your library... | Hledat v kurzech… |
| filters | Filters | Filtry |
| clearSearch | Clear search | Smazat hledání |
| viewToggle | View toggle | Přepnout zobrazení |
| gridView | Grid view | Dlaždice |
| listView | List view | Seznam |
| activeFilters | Active filters: | Použité filtry: |
| removeFilter | Remove filter | Odebrat filtr |
| clearAll | Clear all | Zrušit vše |
| removeTag | Remove tag | Odebrat štítek |
| selected | Selected | Vybráno |
| searchByTags | Search by tags | Hledat podle štítků |
| searchTagsPlaceholder | Search tags… | Hledat štítky… |
| searchTagsAria | Search tags | Hledat štítky |
| clearTagSearch | Clear tag search | Smazat hledání štítků |
| noTagsFound | No tags found | Žádný štítek nenalezen |
| closeFilters | Close filters | Zavřít filtry |
| clear | Clear | Smazat |
| applyFilters | Apply filters | Použít filtry |
| descriptionHeader | Description | Popis |
| priceHeader | Price | Cena |
| noDescription | No description | Bez popisu |
| free | FREE | ZDARMA |
| rowsPerPage | Rows per page: | Řádků na stránku: |
| previousPage | Previous page | Předchozí stránka |
| nextPage | Next page | Další stránka |
| paginationAria | Pagination | Stránkování |
| tags | Tags | Štítky |
| filterByTag | Filter by Tag | Filtrovat podle štítku |
| noTagsAddedYet | No tags added yet !! | Zatím žádné štítky |
| every3Months | every 3 months | každé 3 měsíce |
| every6Months | every 6 months | každých 6 měsíců |
| date | Date: | Datum: |
| allTags | All tags | Všechny štítky |
| close | Close | Zavřít |
| confirmEnrolment | Confirm enrollment | Potvrdit zápis |
| enrolConfirmMessage | Are you sure you want to enroll in this product? | Opravdu se chcete zapsat do tohoto kurzu? |
| yesEnrollMe | Yes, enroll me | Ano, zapsat |
| completion | Completion | Dokončeno |
| status | Status | Stav |
| assessment | Assessment | Test |
| answers | Answers | Odpovědi |
| viewDownloads | View Downloads | Soubory ke stažení |
| openInMaps | Open in Maps | Otevřít v mapě |
| creatorHub | Creator Hub | Pro autory |
| openMenu | Open menu | Otevřít menu |
| selectLanguage | Select language | Vybrat jazyk |
| chooseLanguage | Choose language | Zvolte jazyk |
| openProfileMenu | Open profile menu | Otevřít menu profilu |
| scorm | SCORM | SCORM |
| affiliates | Affiliates | Partnerský program |

## Kurz a lekce (`course_info`)

| Klíč | Anglicky | Česky |
|---|---|---|
| completed | Completed | dokončeno |
| chapters | Chapters | lekcí |
| modulesLabel | modules | moduly |
| chaptersLabel | chapters | lekce |
| courseComplete | Course complete | Kurz je dokončený |
| courseFinishedCertReady | You've finished all {{count}} chapters. Your certificate is ready to download. | Prošli jste všech {{count}} lekcí. Certifikát si můžete stáhnout. |
| courseFinishedNoCert | You've finished all {{count}} chapters. This course is now marked complete in your library. | Prošli jste všech {{count}} lekcí. Kurz je v knihovně označený jako dokončený. |
| getYourCertificate | Get your certificate | Stáhnout certifikát |
| closeCompletion | Close | Zavřít |
| previous | Prev | Předchozí |
| keepGoing | Nice work — keep going | Skvělé, pokračujte |
| hideMenu | Hide Menu | Skrýt menu |
| openMenu | Open Menu | Otevřít menu |
| collapseSidebar | Collapse sidebar | Skrýt obsah kurzu |
| openCurriculum | Open curriculum | Otevřít obsah kurzu |
| curriculum | Curriculum | Obsah kurzu |
| CompleteallchapterstoEarncertificate | Complete all chapters to earn certificate | Dokončete všechny lekce a získáte certifikát |
| certificateMsgOnCourseCompletion | Congratulations on successfully completing the course and earning your certificate! | Gratulujeme, kurz máte za sebou a certifikát je váš! |
| certificateMsgOnChapterPending | Almost there! Complete all the chapters to unlock your certificate! | Už jen kousek. Dokončete všechny lekce a certifikát se odemkne. |
| shareCertificate | Share Certificate | Sdílet certifikát |
| shareResult | Share Result | Sdílet výsledek |
| feedback | Feedback | Zpětná vazba |
| provideFeedbackForCourse | Provide us with feedback for the course. | Napište nám, jak se vám kurz líbil. |
| yourRating | Your Rating | Vaše hodnocení |
| detailedReviewPlaceholder | Provide a detailed review... | Napište své hodnocení… |
| noCommentsYet | No comments yet | Zatím žádné komentáře |
| beFirstToComment | Be the first to share your thoughts on this chapter. | Napište k lekci první komentář. |
| showMoreComments | Show {{count}} more comments | Zobrazit další komentáře ({{count}}) |
| commentActions | Comment actions | Možnosti komentáře |
| enrol | Enroll | Zapsat se |
| enroll | Enroll | Zapsat se |
| areyousure | Are you sure you want to enroll | Opravdu se chcete zapsat |
| areYouSureEnrollNow | Are you sure you want to enroll now? | Opravdu se chcete zapsat? |
| enrolling | Enrolling... | Zapisuji… |
| no | No | Ne |
| yes | Yes | Ano |
| previewModeNotice | In preview mode, quizzes, assignments, and progress tracking are disabled; enroll and log in via our member portal for full access. | V náhledu nefungují testy, úkoly ani sledování postupu. Pro plný přístup se zapište a přihlaste. |
| accessRestricted | Access Restricted ! | Přístup omezen |
| accessRestrictedMessage | You don't have permission to view this Product. Please enroll first to access the content. | K tomuto kurzu zatím nemáte přístup. Nejdřív se do něj zapište. |
| browseOtherProducts | Browse Other Products | Prohlédnout další kurzy |
| goToDashboard | Go to Dashboard | Zpět na přehled |
| availableSoon | Available Soon ! | Brzy k dispozici |
| contentLocked | Content is locked | Obsah je zamčený |
| gotItThanks | Got it, thanks! | Rozumím |
| coursePurchaseUnavailable | This course is not available for purchase right now. Please contact support. | Kurz teď nejde koupit. Napište nám prosím. |
| copyUrl | Copy URL | Kopírovat odkaz |
| orDirectShare | or Direct Share | nebo sdílet přímo |
| generatingShareLink | Generating share link... | Připravuji odkaz… |
| audioClass | Audio Class | Audio lekce |
| mute | Mute | Ztlumit |
| volume | Volume | Hlasitost |
| back10Seconds | Back 10 seconds | O 10 sekund zpět |
| forward10Seconds | Forward 10 seconds | O 10 sekund dopředu |
| playbackSpeed | Playback speed | Rychlost přehrávání |
| attachedResources | Attached Resources | Soubory ke stažení |
| preview | Preview | Náhled |
| download | Download | Stáhnout |
| noContentUploaded | Oops. Seems course admin forgot to upload any content for this chapter !! | Tahle lekce je zatím prázdná. |
| loadingShort | Loading... | Načítám… |
| loadingContent | Loading content... | Načítám obsah… |
| close | Close | Zavřít |
| dismiss | Dismiss | Zavřít |
| dismissHint | Dismiss hint | Zavřít nápovědu |
| email | Email | E-mail |
| instructor | Instructor | Lektorka |
| bundle | Bundle | Balíček |
| getLabel | Get | Získat |
| online | Online | Online |
| on | On | Dne |
| onLabel | On : | Dne: |
| poweredBy | Powered by | Běží na |
| poweredByFreshlearn | Powered by FreshLearn | Běží na FreshLearn |
| completionDate | Completion Date | Datum dokončení |
| certificateNo | Certificate No | Číslo certifikátu |
| validFrom | Valid from: | Platí od: |
| submitAssessment | Start Assessment | Začít test |
| chooseSingleTheBestAnswer | Choose the best answer | Vyberte správnou odpověď |
| chooseMultipleTheBestAnswer | Choose the best answers | Vyberte správné odpovědi |
| writeYourAnswer | Write your answer here… | Sem napište odpověď… |
| completeAssessmentToUnlockResult | Complete the assessment to unlock your results. | Výsledky uvidíte po dokončení testu. |
| assessmentSubmittedReview | Assessment submitted for review. Will notify you via email once done. | Test je odeslaný ke kontrole. Výsledek vám pošleme e-mailem. |
| assessmentLocked | This assessment is locked. | Test je zamčený. |
| assignmentStatus | Status | Stav |
| enterQuestionHere | Enter the Question here | Sem napište otázku |
| assessmentSummary | Assessment Summary | Výsledky testu |
| downloadPdf | Download PDF | Stáhnout PDF |
| score | Score: | Skóre: |
| questions | Questions | Otázky |
| correct | Correct | Správně |
| incorrect | Incorrect | Špatně |
| wrong | Wrong | Špatně |
| pending | Pending | Čeká |
| percentageObtained | Percentage Obtained : | Úspěšnost: |
| scoreCriteria | Score Criteria : | Podmínka úspěchu: |
| greaterThan | Greater than | více než |
| greaterThanOrEqual | Greater than or Equal to | alespoň |
| lessThanOrEqual | Less than or Equal to | nejvýše |
| lessThan | Less than | méně než |
| equalTo | Equal To | přesně |
| between | Between | mezi |
| studentAnswer | Student Answer: | Vaše odpověď: |
| explanation | Explanation: | Vysvětlení: |
| indicateAnswerCorrectWrong | Indicate if this answer is correct/wrong : | Označte, zda je odpověď správně: |
| submissionStatus | Submission Status | Stav odevzdání |
| action | Action | Akce |
| inReview | In Review | Ke kontrole |
| noRecordsFound | No records found. | Nic nenalezeno. |
| delete | Delete | Smazat |
| edit | Edit | Upravit |
| clickHere | Click here | Klikněte sem |
| toUploadFiles | to upload Files | a nahrajte soubory |
| zoomMeeting | Zoom Meeting | Schůzka v Zoomu |
| openInZoom | Open in Zoom | Otevřít v Zoomu |
| inPersonClass | In-Person Class | Lekce naživo |
| liveClass | Live Class | Živé vysílání |
| meetingLink | Meeting Link | Odkaz na schůzku |
| copyMeetingLink | Copy meeting link | Kopírovat odkaz na schůzku |
| meetingId | Meeting ID | ID schůzky |
| copyMeetingId | Copy meeting ID | Kopírovat ID schůzky |
| password | Password | Heslo |
| copyPassword | Copy password | Kopírovat heslo |
| location | Location | Místo |
| copyLocation | Copy location | Kopírovat adresu |
| joinLiveClass | Join Live Class | Připojit se |
| viewLocation | View Location | Zobrazit místo |
| scormContent | SCORM Content | Obsah SCORM |
| askToAi | Ask to AI | Zeptat se AI |
| startNewChat | Start a new chat | Nový rozhovor |
| newChat | New chat | Nový rozhovor |
| restoreChat | Restore chat | Obnovit rozhovor |
| maximizeChat | Maximize chat | Zvětšit okno |
| closeChat | Close chat | Zavřít rozhovor |
| sources | Sources | Zdroje |
| typeYourQuestion | Type your question | Napište otázku |
| sendMessage | Send message | Odeslat |
| userexprience | User Experience Design: Complete UX Fundamentals Course | *(vzorový text FreshLearn, nepřekládat)* |

## Certifikáty (`achievements`)

| Klíč | Anglicky | Česky |
|---|---|---|
| achievements | Achievements | Certifikáty |
| yourEarnings | Your Earned Certificates And Accomplishments | Vaše certifikáty |
| productName | Product Name | Kurz |
| issuedOn | Issued On | Vydáno |
| actions | Actions | Akce |
| noAchievements | No Achievements Found ! | Zatím tu nejsou žádné certifikáty |
| searchByProductName | Search by product name | Hledat podle názvu kurzu |
| view | View | Zobrazit |
| itemsPerPage | Items per page | Položek na stránku |
| showing | Showing | Zobrazeno |
| to | to | až |
| of | of | z |
| course | Course | Kurz |
| masterclass | Masterclass | Masterclass |
| productBundle | Product Bundle | Balíček kurzů |
| select | Select | Vybrat |
| certificate | Certificate | Certifikát |
| downloadCertificate | Download Certificate | Stáhnout certifikát |

## Profil, heslo, nákupy (`member_edit_update`, `change_password`, `member_billing`)

| Klíč | Anglicky | Česky |
|---|---|---|
| member_edit_update.otherCourses | Other Courses | Další kurzy |
| member_edit_update.location | Location | Bydliště |
| member_edit_update.accountSettings | Account Settings | Nastavení účtu |
| member_edit_update.accountSettingsSubtitle | Manage your profile, security and activity in one place. | Profil, heslo a nákupy na jednom místě. |
| member_edit_update.photoUploadHint | JPG or PNG · max 1 MB · 250 × 100 recommended | JPG nebo PNG · max. 1 MB · ideálně 250 × 100 |
| change_password.passwordSubtitle | Use a strong password you don't use elsewhere. Minimum 8 characters recommended. | Zvolte silné heslo, které nepoužíváte jinde. Aspoň 8 znaků. |
| change_password.enterCurrentPassword | Enter current password | Současné heslo |
| change_password.chooseNewPassword | Choose a new password | Nové heslo |
| change_password.reEnterNewPassword | Re-enter new password | Nové heslo znovu |
| change_password.newPasswordHint | Pick something memorable but hard to guess. Avoid reusing passwords. | Snadno zapamatovatelné, těžko uhodnutelné. Nepoužívejte stejné heslo jinde. |
| member_billing.download | Download | Stáhnout |
| member_billing.purchaseHistorySubtitle | A record of every purchase and payment linked to your account. | Přehled nákupů a plateb na vašem účtu. |
| member_billing.transaction | transaction | platba |
| member_billing.transactions | transactions | plateb |
| member_billing.gift | Gift | Dárek |
| member_billing.noPurchaseHistoryText | This is where you'll see a record of all your purchases and payments related to your digital products. Once a transaction happens, it will appear here. | Tady uvidíte své nákupy a platby. Zatím tu nic není. |
| member_billing.salesTax | Sales Tax | DPH |
| member_billing.inclusive | incl. | vč. |
| member_billing.total | Total | Celkem |
| member_billing.subscriptions | Subscriptions | Předplatné |
| member_billing.subscriptionsSubtitle | Manage your recurring plans, payment methods and view past transactions. | Opakované platby, platební karta a přehled plateb. |
| member_billing.product | Product | Kurz |
| member_billing.type | Type | Typ |
| member_billing.status | Status | Stav |
| member_billing.createdOn | Created on | Založeno |
| member_billing.fromDate | From date | Od |
| member_billing.endDate | End date | Do |
| member_billing.actions | Actions | Akce |
| member_billing.viewTransactions | View Transactions | Zobrazit platby |
| member_billing.changeCard | Change Card | Změnit kartu |
| member_billing.cancelSubscription | Cancel Subscription | Zrušit předplatné |
| member_billing.manageThisSubscription | Manage this subscription | Spravovat předplatné |
| member_billing.close | Close | Zavřít |
| member_billing.noActiveSubscriptions | You don't have any active subscriptions yet | Žádné předplatné nemáte |
| member_billing.noActiveSubscriptionsText | Subscriptions give you ongoing access — monthly or yearly — to digital products you subscribe to. Any active plans will appear here. | Předplatné dává přístup na měsíc nebo na rok. Aktivní předplatné uvidíte tady. |
| member_billing.cancelSubscriptionTitle | Cancel subscription? | Zrušit předplatné? |
| member_billing.cancelSubscriptionMessage | You'll lose access at the end of your current billing period. This action can't be undone. | Přístup skončí na konci zaplaceného období. Nejde to vrátit. |
| member_billing.keepSubscription | Keep Subscription | Ponechat předplatné |
| member_billing.yesCancel | Yes, cancel | Ano, zrušit |
| member_billing.subscriptionTransactions | Subscription transactions | Platby předplatného |
| member_billing.id | ID | ID |
| member_billing.currency | Currency | Měna |
| member_billing.noTransactionsYet | No transactions yet | Zatím žádné platby |
| member_billing.noTransactionsText | Transactions for this subscription will show up here once processed. | Platby předplatného se objeví tady. |
| member_billing.subscriptionActions | Subscription actions | Možnosti předplatného |

## Přihlášení a registrace (`sign_in`, `sign_up`)

| Klíč | Anglicky | Česky |
|---|---|---|
| sign_in.welcomToFreshlms | Welcome to FreshLearn | Vítejte |
| sign_up.welcomToFreshlms | Welcome to FreshLearn | Vítejte |
| sign_up.chooseYourLanguage | Choose your Language | Zvolte jazyk |
| sign_up.selectCountry | Select Country | Vyberte zemi |
| sign_up.searchCountry | Search country | Hledat zemi |
| sign_up.noCountriesMatch | No countries match your search | Žádná země neodpovídá |
| sign_up.required | Required | Povinné |
| sign_up.phoneNumber | Phone Number | Telefon |
| sign_up.phoneNumberRequired | Phone Number is required! | Vyplňte telefon. |
| sign_up.dateOfBirth | Date of Birth | Datum narození |
| sign_up.dateOfBirthRequired | Date of Birth is required! | Vyplňte datum narození. |
| sign_up.dateOfBirthHint | DD / MM / YYYY | DD / MM / RRRR |
| sign_up.licenseNumber | License Number | Číslo licence |
| sign_up.licenseNumberRequired | License Number is required! | Vyplňte číslo licence. |
| sign_up.country | Country | Země |
| sign_up.countryRequired | Country is required! | Vyberte zemi. |
| sign_up.addressOne | Address line 1 | Ulice a číslo |
| sign_up.addressOnePlaceholder | Street address | Ulice a číslo |
| sign_up.addressOneRequired | Address line 1 is required! | Vyplňte ulici a číslo. |
| sign_up.addressTwo | Address line 2 | Doplňující adresa |
| sign_up.addressTwoPlaceholder | Apartment, suite, unit | Byt, patro |
| sign_up.city | City | Město |
| sign_up.cityRequired | City is required! | Vyplňte město. |
| sign_up.state | State | Kraj |
| sign_up.stateRequired | State is required! | Vyplňte kraj. |
| sign_up.zipcode | ZIP | PSČ |
| sign_up.zipcodeRequired | ZIP is required! | Vyplňte PSČ. |
| sign_up.previousMonth | Previous month | Předchozí měsíc |
| sign_up.nextMonth | Next month | Další měsíc |
| sign_up.month | Month | Měsíc |
| sign_up.year | Year | Rok |
| sign_up.clear | Clear | Smazat |
| sign_up.signupsAreClosed | Sign-ups are closed | Registrace je uzavřená |
| sign_up.askAdminForInvite | Ask the Admin for an invite, or sign in if you already have an account | Přístup získáte zakoupením kurzu. Pokud už účet máte, přihlaste se. |
| sign_up.goToSignIn | Go to sign in | Přihlásit se |

## Hlášky, patička, obecné (`alertmessages`, `footer`, `common`)

| Klíč | Anglicky | Česky |
|---|---|---|
| alertmessages.signInSuccessMessage | Signed In Successfully! | Jste přihlášeni. |
| alertmessages.invalidCredentialsMessage | Invalid Credentials | Nesprávný e-mail nebo heslo |
| alertmessages.paymentCapturedNotEnrolled | Your payment went through, but we could not confirm it. Please do not pay again - contact support and we will complete your enrolment. | Platba proběhla, ale nepodařilo se ji potvrdit. Neplaťte prosím znovu, napište nám a zápis dokončíme. |
| alertmessages.enrol | Enroll | Zapsat se |
| alertmessages.areyousure | Are you sure you want to enroll | Opravdu se chcete zapsat |
| alertmessages.expiredTitle | Access Expired | Přístup vypršel |
| alertmessages.expiredMessage | Your access has expired. Purchase again to continue accessing all courses and materials. | Přístup do kurzu vypršel. Pro další přístup kurz zakupte znovu. |
| alertmessages.bundleExpiredTitle | Bundle Expired | Balíček vypršel |
| alertmessages.bundleExpiredMessage | Your Product Bundle has expired. Purchase again to continue accessing all courses and materials. | Přístup k balíčku vypršel. Pro další přístup ho zakupte znovu. |
| alertmessages.maybeLater | Maybe Later | Teď ne |
| alertmessages.buyAgain | Buy Again | Koupit znovu |
| alertmessages.somethingWentWrong | Something went wrong. Please try again. | Něco se nepovedlo. Zkuste to prosím znovu. |
| alertmessages.couponApplied | Coupon code applied successfully! | Slevový kód je uplatněný. |
| alertmessages.selectPaymentType | Please select a payment type. | Vyberte způsob platby. |
| alertmessages.enrolledSuccessfully | Enrolled successfully! | Jste zapsáni. |
| alertmessages.passwordUpdated | Password updated successfully! | Heslo je změněné. |
| alertmessages.passwordMismatch | Passwords do not match! | Hesla se neshodují. |
| alertmessages.reviewSaved | Review saved successfully! | Hodnocení je uložené. |
| alertmessages.reviewUpdated | Review updated successfully! | Hodnocení je upravené. |
| alertmessages.subscriptionCancelledSuccess | Subscription cancelled successfully! | Předplatné je zrušené. |
| alertmessages.feedbackThanks | Thanks for your feedback! | Děkujeme za zpětnou vazbu. |
| alertmessages.updatedSuccessfully | Updated successfully! | Uloženo. |
| alertmessages.accountLockedPrefix | Your account has been temporarily locked. Please contact your administrator at | Účet je dočasně zablokovaný. Napište nám na |
| alertmessages.accountLockedSuffix | for assistance with unlocking your account. | a účet odblokujeme. |
| alertmessages.devToolsRestricted | Developer tools access is restricted. Unauthorized actions are not allowed. | Nástroje pro vývojáře nejsou povolené. |
| alertmessages.ok | OK | OK |
| alertmessages.affiliateMember | Affiliate Member | Partner |
| footer.termsOfUse | Terms and Conditions | Obchodní podmínky |
| footer.privacyPolicy | Privacy Policy | Ochrana osobních údajů |
| footer.copyrightContent | Copyright | Copyright |
| footer.madeIn | Made in | Vytvořeno v |
| common.chooseLanguage | Choose language | Zvolte jazyk |
| common.selectLanguage | Select language | Vybrat jazyk |
| common.close | Close | Zavřít |
| common.dismiss | Dismiss | Zavřít |
| common.isRequired | is required | je povinné |
| common.thisField | This field | Toto pole |
| common.digit | Digit | Číslice |
