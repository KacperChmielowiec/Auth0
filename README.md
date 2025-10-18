# Instrukcja uruchomienia aplikacji (Frontend i Backend)

---

## 1. Wymagania wstępne

Upewnij się, że masz zainstalowane:

* **Node.js** (zawierający **npm**)
* **Git**

---

## 2. Klonowanie i instalacja

1.  **Sklonuj** repozytorium:
    ```bash
    
    git clone https://github.com/KacperChmielowiec/Auth0.git
    ```

## 3. Uruchomienie Serwera (Backend)

1.  **Przejdź** do katalogu serwera Auth0/api:
    ```bash
    
    cd api
    ```

2.  **Zainstaluj** zależności serwera:
    ```bash
    npm install
    
    # Należy znajdować sie w katalogu /Auth0/api
    ```

3.  **Uruchom** serwer:
    ```bash
    node app.js
    
    # Należy znajdować sie w katalogu /Auth0/api
    ```

---

## 4. Uruchomienie Klienta (Frontend)


1.  **Przejdź** do katalogu klienta:
    ```bash
    cd client
    ```

2.  **Zainstaluj** zależności klienta:
    ```bash
    npm install
    
    # Należy znajdować sie w katalogu /Auth0/client
    ```

3.  **Uruchom** aplikację kliencką (Frontend):
    ```bash
    npm run serve
    ```

Po wykonaniu tych kroków aplikacja kliencka powinna być dostępna w przeglądarce
*http://localhost:80* - client ( vue.js )
*http://localhost:8080* - api ( node.js )

## 4. Dostęp do zasobów

1. W panelu Auth0 zostało utworzonych 2 użytkownkiów z dostępem do api oraz aplikacji:
   *Admin* - test@admin.pl
   *User" - test@go.pl

Dane logowania ( logowanie Universal Login ) przez aplikacje ,,client''

test@admin.pl
Uvxb!VwzLG2UDQ9

test@go.pl
PracticeAppPass!321


## 5. Działanie aplikacji

Aplikacja ma możliwość:

- Logowania / wylogowania
- rejestracji użytkownika przez Auth0 okno
- Dostęp do zasobów publicznych
- Dostęp do zasobów prywatnych ( w tym z podziałem na role )
- wyświetlanie profilu użytkownika

Autoryzacja:

Aplikacja node.js stosuje Autotyzacje przez token JWT gdzie zapisane są informacje o aplikacji klienta oraz użytkowniku ( role , email itd )
Aplikacja node.js weryfikuje token przez klucz publiczny RS256 za pomocą serwera 3 ( Auth0 )
Aplikacja klienta korzysta z biblioteki  https://github.com/auth0/auth0-vue (  '@auth0/auth0-vue' )
- bilioteka umożliwia pobieranie danych o użytkowników
- sprawdzanie stanu tokena w czasie rzeczywistym
- odświeżanie i przechowywanie tokena w bezpieczny niejawny sposób ( wewnątrz hooka )
- wymienia callback_code na token bearer w niejawny sposób  wewnatrz hooka
Aplikacja + hook daje kontrole nad odświeżaniem stanu tokena bez sprawdzania stanu ręcznie

## 6. Rodzaje zasobów

Aplikacja obsługuje 2 role ( Admin, User )

Użytkownik niezalogowany ma dostęp:

do slidera ze zdjęciami pobieranymi z api  ( strona główna )

Admin ma dostęp do:

- slidera ze zdjęciami pobieranymi z api  ( strona główna )
- aktualnośći ( strona główna )
- postów ( /posts )
- dokumentów ( /docs

User ma dostęp do:

- slidera ze zdjęciami pobieranymi z api  ( strona główna )
- aktualnośći ( strona główna )
- postów ( /posts )


Weryfikacja odbywa sie na podstawie pola permissions wewnatrz tokena JWT 


## 6. UStawienia w Auth0.menager

Aby aplikacja działała wymagane było ustawienie:

- utworzenie aplikacji klienta
- utorzenie aplikacji API
- dodanie do aplikacji klienta 
    {
      "domain": "dev-tah3h7wxplpcrg31.eu.auth0.com",
      "clientId": "CSkvRyn9d7wo4C7HFqqYI5scHBivrhMn"
    }
- utworzenie użytkowników
- utworzenie ról oraz zezwoleń a następnie przypisanie do użytkowników
- ustawienie w aplikacji klienta odpowiednich URL dla callback / redirect
- ustawienie w panelu dla aplikacji api 
  <img width="1034" height="308" alt="image" src="https://github.com/user-attachments/assets/f947ee4e-e3aa-4d2e-a87c-b922b91c4d90" />

  w celu dodania permissions do tokenu

- ustawienie w panelu dla aplikacji klienta  (vue.js )

<img width="1088" height="344" alt="image" src="https://github.com/user-attachments/assets/35ccbd31-dc88-46cc-b35b-efa1bd4a9928" />

Aby nie wylogoło nas po odświeżeniu strony

- ustawienie w panelu dla aplikacji klienta
<img width="1011" height="258" alt="image" src="https://github.com/user-attachments/assets/c39a8aac-d87d-4265-b545-bebb731f551c" />

w celu zapewnienia weryfikacji przez wymiane kodu tymczasowego na token













