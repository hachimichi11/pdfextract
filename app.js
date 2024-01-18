const nlp = window.nlp;
nlp.extend(window.compromiseDates);
// nlp.extend(window.compromiseNumbers)
nlp.extend(window.compromiseStats);

document.getElementById('uploadForm').addEventListener('submit', function(event) {
    event.preventDefault();
    var fileInput = document.getElementById('pdfFile');
    if (fileInput.files.length > 0) {
        var file = fileInput.files[0];
        var reader = new FileReader();
        reader.onload = function(ev) {
            var arrayBuffer = ev.target.result;
            pdfjsLib.getDocument({data: arrayBuffer}).promise.then(function(pdf) {
            
                pdf.getPage(1).then(function(page) {

                    page.getTextContent().then(function(textContent) {

                        var text = textContent.items.map(item => item.str).join(' ');

                        console.log('text :>> ', text);
                        var doc = nlp(text);

                        let output = '';
                        let people2 = doc.people().out('array');
                        // console.log("people",people);
                        output += '<p>people2:' + people2 + '<p></p>';  
                        let contractions = doc.contractions().out('array');
                        
                        console.log(contractions);
                        
                        let expanded = doc.contractions().expand().out('text');
                
                        console.log(expanded);
                
                        let clauses = doc.clauses().out('array');
                
                        console.log(clauses); 
                
                        let numbers = doc.numbers().out('array');
                
                        console.log(numbers);
                
                        let people1 = doc.people()
                
                        console.log('people1 :>> ', people1);
                
                        let money = doc.money()
                
                        console.log('money :>> ', money);
                
                        console.log('doc.text() :>> ', doc.text());
                
                        console.log('doc.compute() :>> ', doc.compute());
                
                        console.log('doc.termList() :>> ', doc.termList());
                
                        console.log('doc.terms() :>> ', doc.terms());
                
                        console.log('doc.confidence() :>> ', doc.confidence());
                
                        console.log('doc.autoFill() :>> ', doc.autoFill());
                
                        console.log('doc.unique() :>> ', doc.unique());
                
                        console.log('doc.contractions() :>> ', doc.contractions());
                
                        console.log('doc.contractions().expand() :>> ', doc.contractions().expand());
                
                        console.log('doc.numbers().toCardinal() :>> ', doc.numbers().toCardinal);
                
                        let cardinals = doc.numbers().toCardinal().out('array');
                    
                        output += 'Percentage :' + doc.percentages().out('array')  + '<p></p>';  
                
                        output += '<p>All numbers :' + JSON.stringify(numbers) + '<p></p>';
                        output += '<p>Ranking :' + JSON.stringify(cardinals) + '<p></p>';
                        output += '<p>Ranking conversion :' + doc.numbers().toCardinal().out('array') + '<p></p>';  
                
                        output += '<p>doc.groups():' + JSON.stringify(doc.groups()) + '</p>';
                        output += '<p>Money :' + doc.money().get() + '</p>';  
                
                        console.log('doc.clauses() :>> ', doc.clauses());
                
                        console.log('<p>doc.chunks() :>> ', doc.chunks());
                
                        console.log('doc.phoneNumbers() :>> ', doc.phoneNumbers());
                
                        output += '<p> PhoneNumbers()  :' + doc.phoneNumbers().out('array') + '<p></p>';  
                
                        console.log('doc.hashTags() :>> ', doc.hashTags());
                        output += '<p> Hashtag  :' + doc.hashTags().out('array') + '<p></p>';  
                
                        console.log('doc.emails() :>> ', doc.emails());
                        output += '<p>Emails  :' + doc.emails().out('array') + '<p></p>';  
                
                        console.log('doc.organizations() :>> ', doc.organizations());
                        output += '<p>Organization()  :' + doc.organizations().out('array') + '<p></p>';  
                
                        console.log('doc) :>> ', doc.adverbs());
                
                        console.log('doc.acronyms() :>> ', doc.acronyms());
                        output += '<p>Acronyms  :' + doc.acronyms().out('array') + '<p></p>';  
                
                        console.log('doc.durations() :>> ', doc.durations());
                        console.log('doc.times() :>> ', doc.times());
                
                        output += '<p>Time :' + doc.times().out('array') + '</p>';  
                
                        console.log('doc.tfidf({}) :>> ', doc.tfidf({}));
                
                        // output += '<p>doc.acronyms()  :' + doc.acronyms().out('array') + '<p></p>';  
                
                        console.log('doc.ngrams :>> ', doc.ngrams);
                
                        console.log('doc.bigrams() :>> ', doc.bigrams());
                
                        console.log('doc.trigrams() :>> ', doc.trigrams());
                        
                        let bigrams = doc.bigrams()
                        let trigrams = doc.trigrams();
                
                        let bigramsStr = bigrams.map(bigram => `${bigram.normal}: ${bigram.count}`).join('<p></p>');        
                        let trigramsStr = trigrams.map(trigram => `${trigram.normal}: ${trigram.count}`).join('<p></p>');// let output = '';
                
                        document.getElementById('output').innerHTML = JSON.stringify(doc.json(), null, 2);
                
                        output += '<p>Acronyms()  :' + doc.acronyms().out('array') + '<p></p>';
                        
                        let json = doc.json();
                
                        let topics = doc.topics().out('array');
                
                        let adverbs = doc.adverbs().out('array');
                
                        let dates = doc.dates().out('array');
                
                        console.log('dates :>> ', dates);
                
                        output += '<p>People: ' + people + '<p></p>';
                
                        console.log(clauses); 
                
                        output += '<p>Contractions: ' + contractions + '</p>';
                
                        output += '<p>Expanded: ' + expanded + '</p>';
                
                        console.log('expanded :>> ', expanded);
                
                        for (let i = 0; i < clauses.length; i++) {
                          output += '<p>    ' + (i+1) + ': ' + clauses[i] + '</p>';
                        }
                
                        output += '<p>Money: ' + doc.money().out('array') + '</p>';  
                
                        console.log('Money :>> ', doc.money().out('array'));
                
                        output += '<p>Email ' + doc.emails().out('array') + '</p>';

                        output += '<p>Confidence: ' + doc.confidence() + '</p>';
                
                        output += '<p>Auto fill: ' + doc.autoFill().out('array') + '</p>';  
                
                        output += '<p>Unique: ' + doc.unique().out('array') + '</p>';
                
                        output += '<p>Contractions: ' + doc.contractions().out('array') + '</p>';
                
                        output += '<p>Expand Contractions: ' + doc.contractions().expand() + '</p>';
                
                        console.log('doc.numbers() :>> ', doc.nouns().adjectives().out('array'));
                       
                        output += '<p>Important  ' + doc.nouns().adjectives().out('array')+ '</p>';
                
                        console.log('important words :>> ', doc.verbs().subjects().out('array'));
                
                        output += '<p>Subjects ' + doc.verbs().subjects().out('array') + '</p>';
                
                        console.log('odrinal words :>> ', doc.numbers().numbers().isOrdinal().out('array'));
                
                        output += '<p>Ordinal number' + doc.numbers().numbers().isOrdinal().out('array') + '</p>';
                
                        console.log('NUMBER :>> ', doc.numbers().numbers().isCardinal().out('array'));
                                
                        console.log('NUMBER :>> ', doc.money().money());
                
                        output += '<p>Important words ' + doc.nouns().adjectives().out('array') + '</p>';
                        
                        document.getElementById('output').innerHTML = output;
        
                        var nouns = doc.nouns().out('array');
                        var places = doc.places().out('array');
                        console.log('Places:', places);
                        var people = doc.people().out('array');
                        console.log('People:', people);
                        var infoTable = document.createElement('table');
                        infoTable.innerHTML = 
                                              '<tr><th>Places</th><td>' + places.join(', ') + '</td></tr>' +
                                              '<tr><th>People</th><td>' + people.join(', ') + '</td></tr>' 

                        document.body.appendChild(infoTable);
                    });
                });
            });
        };
        reader.readAsArrayBuffer(file);
    }
});
