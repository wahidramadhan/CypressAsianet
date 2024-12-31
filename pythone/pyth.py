from selenium import webdriver
from selenium.webdriver.common.by import By

# Inisialisasi WebDriver
driver = webdriver.Chrome()  # Pastikan ChromeDriver ada di PATH
driver.get("https://www.google.com")

# Interaksi dengan halaman
search_box = driver.find_element(By.NAME, "q")
search_box.send_keys("Selenium Python")
search_box.submit()

# Tunggu beberapa detik sebelum menutup browser
driver.implicitly_wait(5)
driver.quit()
