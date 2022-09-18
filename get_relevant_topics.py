import os
import openai
openai.organization = "org-odenvdznd4FpkAvZVt1nS3pJ"
openai.api_key = os.getenv("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")
feature_topic = "how to get this"

def GPT_Completion(texts):
    openai.api_key = "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"
    response = openai.Completion.create(
    engine="text-davinci-002",
    prompt =  texts,
    temperature = 0.6,
    top_p = 1,
    max_tokens = 64,
    frequency_penalty = 0,
    presence_penalty = 0
    )
    return print(response.choices[0].text)

instruction = 'Give me a list of the top 5 relevant topics related to a ' + feature_topic + '.'
GPT_Completion(instruction)