import time
from selenium.webdriver.support import expected_conditions as EC
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.wait import WebDriverWait
from webdriver_manager.chrome import ChromeDriverManager


# Helper to remove characters outside the Basic Multilingual Plane
def clean_text(text):
    return ''.join(c for c in text if ord(c) <= 0xFFFF)

def linkedin_automation(post_text,username,password):
    try:
        # Sanitize post text
        post_text = clean_text(post_text)

        # Setup Chrome driver
        driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))
        wait = WebDriverWait(driver, 15)

        driver.get("https://www.linkedin.com/checkpoint/rm/sign-in-another-account?fromSignIn=true")

        # LinkedIn credentials (replace with secure method in production!)


        # Login
        driver.find_element(By.ID, "username").send_keys(username)
        driver.find_element(By.ID, "password").send_keys(password)
        driver.find_element(By.XPATH, "//button[@type='submit']").click()

        time.sleep(5)
        driver.get("https://www.linkedin.com/feed/")

        # Click "Start a post"
        startpost = wait.until(EC.element_to_be_clickable(
            (By.XPATH, "//button[contains(., 'Start a post')]")
        ))
        startpost.click()
        time.sleep(3)

        # Enter post text
        textarea = wait.until(EC.presence_of_element_located(
            (By.XPATH, "//div[contains(@class,'ql-editor')]")
        ))
        textarea.click()
        textarea.send_keys(post_text)

        # Click "Post"
        post_button = wait.until(EC.element_to_be_clickable(
            (By.XPATH, "//button/span[text()='Post']/..")
        ))
        post_button.click()

        time.sleep(2)
        driver.quit()
        return "Successfully posted using Selenium"

    except Exception as e:
        if 'driver' in locals():
            driver.quit()
        return f"[LinkedIn Automation Failed]: {str(e)}"



