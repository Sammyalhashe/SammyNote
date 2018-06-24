# Sample Note

## Course: ECE356

This is a note. It is note-like and such. What do you think

This is a list:

- One str::asdf::Test::::
  - two sup:main:::asdf::::
    - three
      - four i:fab fa-angular:::::::
        - five
          - six
- seven

1. Hello
2. asdf

This is an image:

![alt text](https://octodex.github.com/images/yaktocat.png 'Logo Title Text 1')

Test Image with my syntax:
img:asd:asdf::::::{alt="asdf" src="https://octodex.github.com/images/yaktocat.png" title="asdf"      }

You can write equations with MathJax:
important::::
asdf
::::
warning::::
asdf
::::
#### $$x = {-b \pm \sqrt{b^2-4ac} \over 2a}.$$

```python
if not os.path.exists('./USD_CAD'):
  os.makedirs('./USD_CAD')

initial_date = dt(2018, 6, 7)
now = dt.now()
t_delta_days = (now - initial_date).days

with open("USD_CAD/USD_CAD.pug", "w+") as PUGFILE:
    try:
        req = requests.get(url=FULL_URL)
        data = req.json()
        USD = data["rates"]["USD"]
        CAD = data["rates"]["CAD"]
        # messagebox.showinfo("USD to CAD:\n", CAD/USD)
        PUGFILE.write(
            PUG % (CAD/USD, (22928.10 + 797.09*(t_delta_days//7))*CAD/USD)
        )
    except requests.exceptions.HTTPError as e:
        print(e)
        print("Check connectivity")
        PUGFILE.write(
            PUG % ("Check connectivity")
        )
with open("USD_CAD/USD_CAD.html", "w+") as HTMLFILE:
    try:
        req = requests.get(url=FULL_URL)
        data = req.json()
        USD = data["rates"]["USD"]
        CAD = data["rates"]["CAD"]
        # messagebox.showinfo("USD to CAD:\n", CAD/USD)
        HTMLFILE.write(
            HTML % (CAD/USD, (22928.10 + 797.09*(t_delta_days//7))*CAD/USD)
        )
        dir_path = os.path.dirname(os.path.abspath(__file__))
        # os.startfile(dir_path + "/USD_CAD/USD_CAD.html")
        opener = "open" if sys.platform == "darwin" else "xdg-open"
        subprocess.call([opener, dir_path + "/USD_CAD/USD_CAD.html"])
    except requests.exceptions.HTTPError as e:
        print(e)
        print("Check connectivity")
```

Here are multiple images:
<div class="container">
  <div class="row">
    <div class="col">
      <div class="figure"><img src="https://picsum.photos/50" class="img-fluid" alt="first"/>
        <figcaption>Figure 1 Lorem ipsum long blah blah blah keep going see what happens</figcaption>
      </div>
    </div>
    <div class="col">
      <div class="figure"><img src="https://picsum.photos/50" class="img-fluid" alt="second"/>
        <figcaption>Figure 2 Lorem ipsum long blah blah blah keep going see what happens</figcaption>
      </div>
    </div>
  </div>
  <br/>
</div>

Example Table:
| First Heading | Second Heading |
| :-----------: | :------------: |
| foo           | bar            |
| blah          | blah           |

| First Heading | Second Heading | Third Heading |
| :-----------: | :------------: | ------------- |
| foo           | bar            | asdf          |
| blah          | blah           | asdf          |


| Date     | Item                                                                              | Amount |
| -------- | --------------------------------------------------------------------------------- | ------ |
| 1-Jan-13 | Jane invests her money                                                            | 6,000  |
| 1-Jan-13 | Rent for January and February                                                     | 1,500  |
| 1-Jan-13 | Borrowed 4000 at 9%, interest payable quarterly, principle due in full in 2 years | 4,000  |
| 1-Jan-13 | Bought equipment, expected 10 year life                                           | 7,200  |
| 1-Jan-13 | Inventory of pizza ingredients and boxes                                          | 800    |
figcaption::::Figure 3. Caption for table::::


blk::::
I made this quote for the sake of making a quote - Sammy Al hashemi 2018
::::figcaption::::A very famous quote by the great Sammy Al Hashemi::::
