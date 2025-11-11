import gradio as gr
from transformers import pipeline

model = pipeline("text-classification", model="bhadresh-savani/distilbert-base-uncased-emotion")

def analyze_text(text):
    result = model(text)[0]
    return {"label": result["label"], "score": float(result["score"])}

demo = gr.Interface(fn=analyze_text, inputs="text", outputs="json")
demo.queue()
demo.launch()
