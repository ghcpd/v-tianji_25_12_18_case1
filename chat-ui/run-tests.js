// Minimal test runner so tests can run without external deps
const { strict: assert } = require('assert')
const { initialConversations, initialContacts } = require('./src/mockData')
const { addMessage, addAutoReply, addContact, filterConversations } = require('./src/lib')

function approxEqual(a,b, msg){ if(a!==b) throw new Error(msg || `${a} !== ${b}`) }

function testAddMessage(){
  const convs = JSON.parse(JSON.stringify(initialConversations))
  const updated = addMessage(convs, 't2', 'You', 'hi there', 1600000000000)
  const t2 = updated.find(c=>c.id==='t2')
  assert.equal(t2.messages[t2.messages.length-1].text, 'hi there')
}

function testAutoReply(){
  const convs = JSON.parse(JSON.stringify(initialConversations))
  const updated = addAutoReply(convs, 't2', 'hello', 't1') // not active
  const t2 = updated.find(c=>c.id==='t2')
  assert.equal(t2.messages[t2.messages.length-1].from, 'AutoReply')
  assert.ok(t2.unread >= 1, 'unread incremented')
}

function testAddContact(){
  const cs = JSON.parse(JSON.stringify(initialContacts))
  const updated = addContact(cs, 'New Person')
  assert.equal(updated[0].name, 'New Person')
  assert.equal(updated.length, cs.length + 1)
}

function testFilter(){
  const convs = JSON.parse(JSON.stringify(initialConversations))
  const res1 = filterConversations(convs, 'coffee')
  assert.equal(res1.length, 1)
  const res2 = filterConversations(convs, 'layout')
  // should match message text in t1
  assert.ok(res2.length >= 1)
}

async function run(){
  console.log('Running tests (node)...')
  try{
    testAddMessage(); console.log('✓ addMessage')
    testAutoReply(); console.log('✓ addAutoReply')
    testAddContact(); console.log('✓ addContact')
    testFilter(); console.log('✓ filterConversations')
    console.log('\nAll tests passed.')
    process.exit(0)
  }catch(err){
    console.error('Test failed:', err.message)
    process.exit(2)
  }
}

run()
