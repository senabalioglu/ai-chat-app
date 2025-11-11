import gradio as gr
from transformers import pipeline

model = pipeline("sentiment-analysis")

def analyze_text(text):
    result = model(text)[0]
    return {"label": result["label"], "score": float(result["score"])}

demo = gr.Interface(
    fn=analyze_text,
    inputs=gr.Textbox(label="Metin gir"),
    outputs="json"
)

if __name__ == "__main__":
    demo.launch(share=True, enable_queue=False)